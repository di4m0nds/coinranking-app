import { useState } from 'react'
import HTMLReactParse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'
import LineChart from './LineChart'

const { Title, Text } = Typography
const { Option } = Select

const CryptoDetails = () => {
    const { coinId } = useParams()

    const [timePeriod, setTimePeriod] = useState('7d')
    const { data: coinHistory, isFetching: isFetchingHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })

    const { data, isFetching: isFetchingDetails } = useGetCryptoDetailsQuery(coinId)
    const cryptoDetails = data?.data?.coin;

    if (isFetchingDetails) return 'Loading Crypto Details ... '
    else if (isFetchingHistory) return 'Loading Crypto History ... '

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
    
    const volume = cryptoDetails['24hVolume'] ? cryptoDetails['24hVolume'] : '000';
    const stats = [
      { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
      { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
      { title: '24h Volume', value: `$ ${volume && millify(volume)}`, icon: <ThunderboltOutlined /> },
      { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
      { title: 'All-time-high (daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
      { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
      { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <img src={cryptoDetails.iconUrl} style={{ width: '40px', height: 'auto' }} />
                <Title level={2} className='coin-name'>
                    {cryptoDetails.name} {cryptoDetails.slug ? `(${cryptoDetails.slug}) Price` : ''}
                </Title>
                <p>
                    {cryptoDetails.name} live price in US dollars. View value statistics, market cap and supply.
                </p>
            </Col>
            <Select
                defaultValue={timePeriod}
                className='select-timeperiod'
                placeholder='Select Time Period'
                onChange={(v) => setTimePeriod(v)}
            >
                {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select>
            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            {CryptoDetails.name} Value Statistics
                        </Title>
                        <p>An Overview showing the stats of {cryptoDetails.name}</p>
                    </Col>
                    {stats.map(({ icon, title, value }, index) => (
                        <Col className='coin-stats' key={index}>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            Other Statistics
                        </Title>
                        <p>An Overview showing the stats of all cryptocurrencies</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }, index) => (
                        <Col className='coin-stats' key={index}>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        What is {cryptoDetails.name}?
                    </Title>
                    {HTMLReactParse(cryptoDetails.description)}
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'>{cryptoDetails.name} Links</Title>
                    {cryptoDetails.links?.map((link, index) => (
                        <Row className='coin-link' key={index}>
                            <Title level={5} className='link-name'>
                                {link.type}
                            </Title>
                            <a href={link.url} target='_blank' rel='norefeerer'>{link.name}</a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails