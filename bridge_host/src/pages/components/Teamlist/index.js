import React from 'react';
import { Card, Col, Row } from 'antd';
import styles from './index.less';

const Teamlist = ({detailData, announcement} ) => {
    console.log(detailData)
    // const annList = announcement.map(child => <a key={child.id} to="#"><p >{child.text}</p></a>)
    return (
        <div style={{ background: '#ECECEC', padding: '15px' }}>
            {/* <Row gutter={18}> */}
                {/* <Col span={14}> */}
                    <Card title="队伍信息" bordered={false}>
                        <p><span className={styles.list_text}>成员编号：</span>{detailData.playerid}</p>
                        <p><span className={styles.list_text}>成员名称：</span>{detailData.name}</p>
                        <p><span className={styles.list_text}>成员角色：</span>{detailData.role}</p>
                        
                    </Card>
                {/* </Col> */}
                {/* <Col span={10}> */}
                    {/* <Card title="通告" bordered={false}>{annList}</Card> */}
                {/* </Col> */}
            {/* </Row> */}
        </div>
    )
}
export default Teamlist;
