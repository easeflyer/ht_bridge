import React from 'react'
import router from 'umi/router';
import ListDecorator from '@/components/ListDecorator'
import { connect } from 'dva';

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
                <ListDecorator detailData={detailData}/>
            </div>
        )
    }
}

export default  connect(({games})=>({games}))(gameView)