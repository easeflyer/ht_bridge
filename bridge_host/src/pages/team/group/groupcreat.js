import React, { Component } from 'react';
import { Input,Form, DatePicker, Select, Modal } from 'antd';
import moment from 'moment';
const Option = Select.Option;

const FormItem = Form.Item  
function timetrans() {
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    return Y + M + D
}
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
    style: {
        width: '300px'
    }
};
const competitionType = ['车轮赛', '小组赛', '竞技赛', '团体赛', '友谊赛']
const integralWay = ['加分制', '减分制', '总分制', '不计分']
export default class Pop extends Component {
    state = {
        edit: {},
        new: false,
        newOrEdit: false,   //false: new, true: edit
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.new) {
            var edit = Object.assign({}, nextProps.edit)
            edit.start_time = timetrans();
            edit.over_time = timetrans();
            edit.signEndTime = timetrans();
            this.setState({ new: true, edit: edit })
        } else {
            this.setState({ edit: Object.assign({}, nextProps.edit) });
        }
        if(nextProps.edit['name']){
            this.setState({newOrEdit: true})
        }
    }
    nameChange(e) {
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.name = val;
            return { edit: copy }
        })
    }
    dateChange(dates, dateStrings) {
        this.setState((prestate, peops) => {
            var copy = Object.assign({}, prestate.edit);
            copy.start_time = dateStrings[0];
            copy.over_time = dateStrings[1];
            return { edit: copy }
        })
    }
    roleChange(value){
        console.log(value)
        // const val = e.target.value
        
        this.setState((prestate, props) => {
            
            var copy = Object.assign({}, prestate.edit)
            copy.role = value;
            return { edit: copy }
        })
    }
    gameidChange(e){
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.gameid = val;
            return { edit: copy }
        })
    }
    refereeChange(e){
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.referee = val;
            return { edit: copy }
        })
    }
    signEndTimeChange(dates, dateStrings){
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.signEndTime = dateStrings;
            return { edit: copy }
        })
    }
    arbitratorChange(e){
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.arbitrator = val;
            return { edit: copy }
        })
    }
    host_unitChange(e){
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.host_unit = val;
            return { edit: copy }
        })
    }
    undertaking_unitChange(e){
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.undertaking_unit = val;
            return { edit: copy }
        })
    }
    cooperating_unitChange(e){
        const val = e.target.value
        this.setState((prestate, props) => {
            var copy = Object.assign({}, prestate.edit)
            copy.cooperating_unit = val;
            return { edit: copy }
        })
    }
    submitHandle() {
        this.props.editChange(Object.assign({}, this.state.edit));
    }
    render() {
        const { visible } = this.props;
        const [name, date, competition, integral] = ['name', 'date', 'competitionType', 'integralWay'];
        const {edit, newOrEdit} = this.state;
        console.log(edit.role)
        const dateFormat = 'YYYY-MM-DD';
        return (
            
            <Modal
                visible={visible}
                title="添加组"
                onCancel={this.props.changeVisible}
                cancelText='取消'
                onOk={this.submitHandle.bind(this)}
                okText='确认'>
                <Form
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    
                    <div>
                      <FormItem {...formItemLayout} label="小组名称">
                        <Input 
                        value={edit.gameid}
                        onChange={this.gameidChange.bind(this)}>
                        </Input></FormItem>
                        {/* <FormItem {...formItemLayout} label="成员名称">
                        <Input
                        value={edit.name}
                        onChange={this.nameChange.bind(this)}>
                        </Input>
                    </FormItem>      */}
                    
                    </div>
                    
                    {/* <div>
                      <FormItem {...formItemLayout} label="成员角色">
                        < Select showSearch defaultValue={edit.role}
                        // onSelect={(value)=>{this.roleChange(value)}}
                        onChange={(value)=>this.roleChange(value)}
                        >
                         <Option value="队员" id='player'>队员</Option>
                        <Option value="队长" id='leader'>队长</Option>
                        <Option value="教练" id='coach'>教练</Option>

                         
                        </Select>
                    </FormItem>     
                    
                    </div>
                     */}
                    {/* {
                        newOrEdit ?
                        <div>
                      <FormItem {...formItemLayout} label="成员编号">
                        <Input value={edit.playerid}
                        onChange={this.playeridChange.bind(this)}
                        ></Input>
                    </FormItem>       
                    
                    </div>
                    : null
                    } */}

                </Form>
            </Modal>
        )
    }
}