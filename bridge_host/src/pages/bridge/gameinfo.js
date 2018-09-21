import React from 'react'
import router from 'umi/router';
import Listgameinfo from '@/components/Listgameinfo'
import { connect } from 'dva';
import { Input,Form, Select, Modal } from 'antd';


class Pop extends React.Component {
    render() {
            
        return (
            <div>
                <span>报名需缴纳200元报名费，是否确认报名？</span>
                <button>确认</button>
            </div>
        )
    }
}

class gameView extends React.Component{
    componentWillMount(){
        const search = location.search.split('=')[1]
        this.setState({
            key: search
        })
    }
    state={
        key: ''
    }
    render(){
        const dataSource = this.props.games.dataSource
        let detailData = {}
        dataSource.map(item=>{
            item['key']===this.state.key ? detailData = item : null
        })

        return(
            <div>
                <Listgameinfo detailData={detailData}/>
                
            </div>
        )
    }
}

export default  connect(({games})=>({games}))(gameView)







 