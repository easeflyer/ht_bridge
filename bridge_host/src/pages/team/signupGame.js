
import React, { Component } from 'react';
import { Input, Table, AutoComplete, } from 'antd';
import {connect} from 'dva'
import data from '../bridge/data';
import router from 'umi/router';
import { routerActions } from 'react-router-redux';


class Bridge extends Component {
    constructor(props){
        super(props);
        this.props=props
    }
    columns = [
        {
            title: '比赛名称',
            dataIndex: 'name',
        },
        {
            title: '报名截止时间',
            dataIndex: 'signEndTime',
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
        }, 
        {
            title: '结束时间',
            dataIndex: "over_time",
        }, 
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => {
                return (
                    <div>
                       
                        
                        <a href="javascript:;" style={{marginLeft:10}} onClick={this.view.bind(this, record)}>报名赛事</a>
                    </div>
                )
            },
        }
    ]
    view=(record)=>{
        router.push(`/bridge/gameinfo?id=${record.key}`)
    }
  
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.dispatch({
            type: 'games/saveSelectedRowKeys',
            selectedRowKeys
        })
    }
    handleRemove() {
        this.props.dispatch({
            type: 'games/delSome',
        })
    }
   
    
    searchValueChange(value) {
        const searchData = this.props.games.dataSource.map((item) => item.name).filter((item) => item.indexOf(value) >= 0)
        this.props.dispatch({
            type: 'games/searchData',
            searchData
        })
    }
    search(value) {//.ant-select-dropdown-hidden控制是否显示
        var dataSource=this.props.games.dataSource.concat()
        const searchData=this.props.games.searchData
        if (searchData.length > 0) {
            dataSource=dataSource.filter((item)=>searchData.find(ele =>(item.name===ele)?true:false))
        }
        //逻辑错误，缺少数据缓存。
        if(!value){
            dataSource=data
        }
        this.props.dispatch({
            type: 'games/saveDataSource',
            dataSource
        })
    }
    render() {
        const { dataSource, selectedRowKeys, searchData, allowClear,  } = this.props.games;
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: this.onSelectChange.bind(this),
        // };
        // const hasSelected = selectedRowKeys.length > 0;
        const pagination = {
            pageSize: 6,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15'],
        }
        return (
            <div style={{ background: "#fff", paddingTop: "15px" }}>
                <AutoComplete
                    dataSource={searchData}
                    onChange={this.searchValueChange.bind(this)}
                    allowClear={allowClear}
                >
                    <Input.Search
                        placeholder="搜索比赛"
                        onSearch={this.search.bind(this)}
                        style={{ width: 250, marginLeft: '25px' }}
                        enterButton
                    />
                </AutoComplete>
               
                <Table
                    // rowSelection={rowSelection}
                    columns={this.columns}
                    dataSource={dataSource}
                    pagination={pagination} 
                />
                
            </div>
        )
    }
}

export default connect(({games})=>({games}))(Bridge)
// export default connect(({contactsList})=>({contactsList}))(Contacts)
