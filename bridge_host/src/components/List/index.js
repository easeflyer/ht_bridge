import React from 'react';
import { Card, Col, Row } from 'antd';
import styles from './index.less';

const ListTeam = ({detailData, announcement} ) => {
    console.log(detailData)
    // const annList = announcement.map(child => <a key={child.id} to="#"><p >{child.text}</p></a>)
    return (
        <div style={{ background: '#ECECEC', padding: '15px' }}>
          
                    <Card title="赛队信息" bordered={false}>
                        <p><span className={styles.list_text}>赛队名称：</span>{detailData.name}</p>
                        {/* <p><span className={styles.list_text}>赛队编号：</span>{detailData.teamId}</p> */}
                        <p><span className={styles.list_text}>参赛记录：</span>{detailData.gameHistory}</p>
                       
                    </Card>
               
        </div>
    )
}
export default ListTeam;
