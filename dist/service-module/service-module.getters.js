/*
eslint
@typescript-eslint/explicit-function-return-type: 0,
@typescript-eslint/no-explicit-any: 0
*/
import sift from 'sift'
import { filterQuery, select } from '@feathersjs/adapter-commons'
import { sorter } from '../sort'
import { globalModels as models } from './global-models'
import _omit from 'lodash/omit'
import { unref } from '@vue/composition-api'
const FILTERS = ['$sort', '$limit', '$skip', '$select']
const additionalOperators = ['$elemMatch']
const getCopiesById = ({
  keepCopiesInStore,
  servicePath,
  serverAlias,
  copiesById
}) => {
  if (keepCopiesInStore) {
    return copiesById
  } else {
    const Model = models[serverAlias].byServicePath[servicePath]
    return Model.copiesById
  }
}
export default function makeServiceGetters() {
  return {
    list: (state) => Object.values(state.keyedById),
    find: (state) => (_params) => {
      const params = unref(_params) || {}
      const { paramsForServer, whitelist, keyedById, idField, tempsById } =
        state
      const q = _omit(params.query || {}, paramsForServer)
      const { query, filters } = filterQuery(q, {
        operators: additionalOperators.concat(whitelist)
      })
      let values = Object.values(keyedById)
      if (params.temps) {
        values.push(...Object.values(tempsById))
      }
      values = values.filter(sift(query))
      if (params.copies) {
        const copiesById = getCopiesById(state)
        // replace keyedById value with existing clone value
        values = values.map((value) => copiesById[value[idField]] || value)
      }
      const total = values.length
      if (filters.$sort !== undefined) {
        values.sort(sorter(filters.$sort))
      }
      if (filters.$skip !== undefined && filters.$limit !== undefined) {
        values = values.slice(filters.$skip, filters.$limit + filters.$skip)
      } else if (filters.$skip !== undefined || filters.$limit !== undefined) {
        values = values.slice(filters.$skip, filters.$limit)
      }
      if (filters.$select) {
        values = select(params)(values)
      }
      return {
        total,
        limit: filters.$limit || 0,
        skip: filters.$skip || 0,
        data: values
      }
    },
    count: (state, getters) => (_params) => {
      const params = unref(_params) || {}
      const cleanQuery = _omit(params.query, FILTERS)
      params.query = cleanQuery
      return getters.find(params).total
    },
    get:
      ({ keyedById, tempsById, idField, tempIdField }) =>
      (_id, _params = {}) => {
        const id = unref(_id)
        const params = unref(_params)
        const record = keyedById[id] && select(params, idField)(keyedById[id])
        if (record) {
          return record
        }
        const tempRecord =
          tempsById[id] && select(params, tempIdField)(tempsById[id])
        return tempRecord || null
      },
    getCopyById: (state) => (id) => {
      const copiesById = getCopiesById(state)
      return copiesById[id]
    },
    isCreatePendingById:
      ({ isIdCreatePending }) =>
      (id) =>
        isIdCreatePending.includes(id),
    isUpdatePendingById:
      ({ isIdUpdatePending }) =>
      (id) =>
        isIdUpdatePending.includes(id),
    isPatchPendingById:
      ({ isIdPatchPending }) =>
      (id) =>
        isIdPatchPending.includes(id),
    isRemovePendingById:
      ({ isIdRemovePending }) =>
      (id) =>
        isIdRemovePending.includes(id),
    isSavePendingById: (state, getters) => (id) =>
      getters.isCreatePendingById(id) ||
      getters.isUpdatePendingById(id) ||
      getters.isPatchPendingById(id),
    isPendingById: (state, getters) => (id) =>
      getters.isSavePendingById(id) || getters.isRemovePendingById(id)
  }
}
