import React from 'react'
import { Col, Row, Typography } from 'antd'
import { Line } from 'react-chartjs-2'
import { RotateLeftOutlined } from '@ant-design/icons'

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = []
    const coinTimestamp = []
    
    for (let i in coinHistory?.data?.history) {
        coinPrice.push(coinHistory?.data?.history[i].price);
        //coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
        coinTimestamp.push('');
    }

    const data = {
      labels: coinTimestamp,
      datasets: [
        {
          label: 'Price in USD',
          data: coinPrice,
          backgroundColor: '#0071bd',
          borderColor: '#0071bd',
          hoverBorderWidth: 20,
          showLine: true,
          hoverBorderJoinStyle: 'miter'
        },
      ],
    };
    const options = {
        plugins: {
            title: {
                display: false,
                text: ' ... '
            },
        },
        scales: {
            x: { display: false, reverse: true },
            y: { display: true, position: 'right', beginAtZero: false }
        },
    };

    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'> {coinName} Price Chart </Title>
                <Col className='price-container'>
                    <Title className='price-change' level={5}>{coinHistory?.data?.change}%</Title>
                    <Title className='current-price' level={5}>Current {coinName} Price: ${currentPrice}</Title>
                </Col>
            </Row>
            <Line options={options} data={data} />
        </>
    )
}

export default LineChart