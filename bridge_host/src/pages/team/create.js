import React, { Component } from 'react';
import { Input,Form, Select, Modal } from 'antd';

const FormItem = Form.Item

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

export default class Pop extends Component {
    state = {
        edit: {},
        new: false,
        newOrEdit: false,   //false: new, true: edit
    }
 
    componentWillReceiveProps(nextProps) {
        if(nextProps.visible){
            if (!nextProps.edit['name']) {
                var edit = Object.assign({}, nextProps.edit)               
                this.setState({ newOrEdit: false, edit: edit })
            } else {
                this.setState({ edit: Object.assign({}, nextProps.edit) ,newOrEdit: true});
            }      
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
    gameHistoryChange(e){
        const val=e.target.value;
        this.setState((prestate,props)=>{
            var copy = Object.assign({},prestate.edit)
            copy.gameHistory=val
            return{edit:copy}}
        )
        
    }
    // teamIDChange(e) {
    //     const val = e.target.value
    //     this.setState((prestate, props) => {
    //         var copy = Object.assign({}, prestate.edit)
    //         copy.teamId = val;
    //         return { edit: copy }
    //     })
    // } 
    submitHandle() {
        this.props.editChange(Object.assign({}, this.state.edit));
    }
    render() {
        const { visible } = this.props;
        const [name, date, competition, integral] = ['name', 'date', 'competitionType', 'integralWay'];
        const {edit, newOrEdit} = this.state;
        console.log(edit)      
        return (
            <Modal
                visible={visible}
                title="新建赛队"
                onCancel={this.props.changeVisible}
                cancelText='取消'
                onOk={this.submitHandle.bind(this)}
                okText='确认'>
                <Form
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <FormItem {...formItemLayout} label="赛队名称">
                        <Input
                            value={edit.name}
                            onChange={this.nameChange.bind(this)}>
                        </Input>
                    </FormItem> 
                    {/* <FormItem {...formItemLayout} label="赛队编号">
                        <Input
                            value={edit.teamId}
                            onChange={this.teamIDChange.bind(this)}>
                        </Input>
                    </FormItem>                                    */}
                    {
                        newOrEdit ?
                        <div>
                    <FormItem {...formItemLayout} label="参赛记录">
                        <Input value={edit.gameHistory}
                        onChange={this.gameHistoryChange.bind(this)}
                        ></Input>
                    </FormItem>                   
                    </div>
                    : null
                    }

                </Form>
            </Modal>
        )
    }
}