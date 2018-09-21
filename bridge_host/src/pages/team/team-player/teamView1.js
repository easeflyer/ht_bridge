import React from 'react'
import router from 'umi/router';
import Teamlist from '@/components/Teamlist'
import { connect } from 'dva';

class teamView extends React.Component{
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
        const dataSource = this.props.teamgames.dataSource
        let detailData = {}
        dataSource.map(item=>{
            item['key']===this.state.key ? detailData = item : null
        })

        return(
            <div>
                <Teamlist detailData={detailData}/>
            </div>
        )
    }
}

export default  connect(({teamgames})=>({teamgames}))(teamView)