
import React, { Component } from 'react';
import { Button, Input, Table, Popconfirm, AutoComplete, Icon } from 'antd';
import {connect} from 'dva'
import data from './teamdata'
import Pop from './teamcreat'
import router from 'umi/router';
import { routerActions } from 'react-router-redux';



class teamBridge extends Component {
    constructor(props){
        super(props);
        this.props=props
    }
    columns = [
        {
            title: '成员手机号',
            dataIndex: 'playerid',
        },
        {
            title: '成员名称',
            dataIndex: 'name',
        },
        {
            title: '成员角色',
            dataIndex: 'role',
        },
        
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => {
                return (
                    <div>
                        {this.props.teamgames.dataSource.length >= 1
                            ? (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                    <a href="javascript:;" style={{ marginRight: '10px' }}>删除</a>
                                </Popconfirm>
                            ) : null}
                        <a href="javascript:;" onClick={this.edit.bind(this, record)} style={{marginRight: '10px'}}>编辑</a>
                        <a href="javascript:;" onClick={this.view.bind(this, record)}>查看</a>
                    </div>
                )
            },
        }
    ]
    view=(record)=>{
        router.push(`/team/team-player/teamView1?id=${record.key}`)
    }
    handleDelete = (key) => {
        this.props.dispatch({
            type: 'teamgames/delOne',
            key
        })
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.dispatch({
            type: 'teamgames/saveSelectedRowKeys',
            selectedRowKeys
        })
    }
    handleRemove() {
        this.props.dispatch({
            type: 'teamgames/delSome',
        })
    }
    changeVisible() {
        this.props.dispatch({
            type: 'teamgames/changeVisible'
        })
    }
    edit(record) {
        this.props.dispatch({
            type: 'teamgames/changeVisible',
            record
        })
    }
    editChange(newEdit) {
        var dataSource = this.props.teamgames.dataSource.concat()
        var key
        if (newEdit.key) {
            key = newEdit.key
        } else {
            key = dataSource[dataSource.length - 1].key + 1
        }
        const index = dataSource.findIndex(item => key === item.key);
        if (index > -1) {
            dataSource.splice(index, 1, newEdit);
            this.props.dispatch({
                type: 'teamgames/clearEdit',
                dataSource
            })
        } else {
            newEdit.key = key;
            dataSource.push(newEdit)
            this.props.dispatch({
                type: 'teamgames/clearEdit',
                dataSource
            })
        }
    }
    searchValueChange(value) {
        const searchData = this.props.teamgames.dataSource.map((item) => item.name).filter((item) => item.indexOf(value) >= 0)
        this.props.dispatch({
            type: 'teamgames/searchData',
            searchData
        })
    }
    search(value) {//.ant-select-dropdown-hidden控制是否显示
        var dataSource=this.props.teamgames.dataSource.concat()
        const searchData=this.props.teamgames.searchData
        if (searchData.length > 0) {
            dataSource=dataSource.filter((item)=>searchData.find(ele =>(item.name===ele)?true:false))
        }
        //逻辑错误，缺少数据缓存。
        if(!value){
            dataSource=data
        }
        this.props.dispatch({
            type: 'teamgames/saveDataSource',
            dataSource
        })
    }
    render() {
        const { dataSource, selectedRowKeys, searchData, allowClear, edit, visible } = this.props.teamgames;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const hasSelected = selectedRowKeys.length > 0;
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
                        placeholder="搜索成员"
                        onSearch={this.search.bind(this)}
                        style={{ width: 250, marginLeft: '25px' }}
                        enterButton
                    />
                </AutoComplete>
                <Button
                    onClick={this.handleRemove.bind(this)}
                    type="primary"
                    style={{ marginBottom: 16, float: 'right', marginRight: '10px' }}
                    disabled={!hasSelected} >
                    批量删除
                </Button>
                <Button
                    type="primary"
                    style={{marginBottom: 16, marginRight: 10, float: 'right' }}
                    onClick={()=>router.push(`../Team`)}
                >
                   返回赛队
                </Button>
                
                <Button
                    type="primary"
                    style={{ marginBottom: 16, marginRight: 10, float: 'right' }}
                    onClick={this.changeVisible.bind(this)}
                >
                    添加成员
                </Button>
                
                <Table
                    rowSelection={rowSelection}
                    columns={this.columns}
                    dataSource={dataSource}
                    pagination={pagination} 
                />
                <Pop
                    visible={visible}
                    changeVisible={this.changeVisible.bind(this)}
                    edit={edit}
                    editChange={this.editChange.bind(this)}
                >
                </Pop>
            </div>
        )
    }
}

export default connect(({teamgames})=>({teamgames}))(teamBridge)
// export default connect(({contactsList})=>({contactsList}))(Contacts)
