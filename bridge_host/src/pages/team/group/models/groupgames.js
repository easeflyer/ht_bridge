import groupdata from '../groupdata'

export default {
    namespace: 'groupgames',

    state:{
        dataSource: groupdata,       //数据源
        selectedRowKeys: [],    //删除选中的key
        visible: false,         //弹出表单
        edit: {},               //新建或编辑
        searchData: [],
    },

    effects:{

    },

    reducers:{
        delOne(state,{key}){
            const dataSource = state.dataSource;
            const newDataSource = dataSource.filter(item => item.key !== key)
            return {...state,...{dataSource: newDataSource}}
        },
        saveSelectedRowKeys(state,{selectedRowKeys}){
            return {...state,...{selectedRowKeys}}
        },
        delSome(state){
            const {selectedRowKeys, dataSource} = state;
            const newDataSource = dataSource.filter(item => !selectedRowKeys.some(key => key === item.key))
            return {...state, ...{dataSource: newDataSource}}
        },
        changeVisible(state,{record={}}){
            return {...state,...{visible: !state.visible, edit: record}}
        },
        clearEdit(state,{dataSource}){
            return {...state,...{dataSource, visible: !state.visible, edit: {}}}
        },
        searchData(state,{searchData}){
            return {...state,searchData}
        },
        saveDataSource(state,{dataSource}){
            return {...state,dataSource}
        }
    }
}