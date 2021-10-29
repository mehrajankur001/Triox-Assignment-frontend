import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import { detailsProduct } from '../Redux/action/products'
const Home = () => {

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const [val, setVal] = useState('')
    const [exchangeRate, setExchangeRate] = useState('')
    const [productID, setProductID] = useState('')

    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    let insurance1 = addDecimal(Number(val * .01))
    let landingCharge = addDecimal(Number(val * .01))
    let totalValue = addDecimal(Number(val) + Number(insurance1) + Number(landingCharge))
    let av = addDecimal(Number(exchangeRate) * Number(totalValue))

    const [cdFromDB, setCdFromDB] = useState(0)
    const [sdFromDB, setSdFromDB] = useState(0)
    const [rdFromDB, setRdFromDB] = useState(0)
    const [vatFromDB, setVatFromDB] = useState(0)

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        if (product && update) {
            setCdFromDB(product.CD)
            setRdFromDB(product.RD)
            setSdFromDB(product.SD)
            setVatFromDB(product.VAT)
            setUpdate(false)
        }
    }, [product])

    let cd = addDecimal(Number(av) * Number(cdFromDB / 100))
    let rd = addDecimal(Number(av) * Number(rdFromDB / 100))
    let sd = addDecimal((Number(av) + Number(cd) + Number(rd)) * Number(sdFromDB / 100))
    let vat = addDecimal((Number(av) + Number(cd) + Number(rd) + Number(sd)) * Number(vatFromDB / 100))

    let total = addDecimal((Number(av) + Number(cd) + Number(rd) + Number(sd) + Number(vat)))


    return (
        <>
            <Container>
                <Row>
                    <Col md={8} lg={8} sm={8}>
                        <Row>
                            <Col md={4} lg={4} sm={4} style={{ textAlign: 'start' }}>
                                <label className='m-2'>Value ($)</label>
                            </Col>
                            <Col md={8} lg={8} sm={8} style={{ textAlign: 'end' }}>
                                <input className='m-2 p-1' style={{ textAlign: 'center' }} name='val' value={val} onChange={(e) => {
                                    setVal(e.target.value)
                                }}></input>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={8} lg={8} sm={8} >
                                Insurance 1%
                            </Col>
                            <Col md={4} lg={4} sm={4} style={{ textAlign: 'center' }}>
                                {insurance1} USD
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8} lg={8} sm={8}>
                                Change 1%
                            </Col>
                            <Col md={4} lg={4} sm={4} style={{ textAlign: 'center' }}>
                                {landingCharge} USD
                            </Col>
                        </Row>
                        <hr style={{ color: 'black', height: '2px' }} />
                        <Row>
                            <Col md={8} lg={8} sm={8}>
                                Total Value
                            </Col>
                            <Col md={4} lg={4} sm={4} style={{ textAlign: 'center' }}>
                                {totalValue} USD
                            </Col>
                        </Row>
                        <div className='av-div'>
                            <Row className='my-4'>
                                <Col md={6} lg={6} sm={6}>
                                    <Row>
                                        <Col md={8} lg={8} sm={8}>
                                            A/v
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={2} lg={2} sm={2}>
                                            CD
                                        </Col>
                                        <Col md={4} lg={4} sm={4}>
                                            <div className='inputDiv1'>
                                                <input className='input1' value={cdFromDB} onChange={e => { setCdFromDB(e.target.value) }} />%
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={2} lg={2} sm={2}>
                                            RD
                                        </Col>
                                        <Col md={4} lg={4} sm={4}>
                                            <div className='inputDiv1'>
                                                <input className='input1' value={rdFromDB} onChange={e => { setRdFromDB(e.target.value) }} />%
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={2} lg={2} sm={2}>
                                            SD
                                        </Col>
                                        <Col md={4} lg={4} sm={4}>
                                            <div className='inputDiv1'>
                                                <input className='input1' value={sdFromDB} onChange={e => { setSdFromDB(e.target.value) }} />%
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={2} lg={2} sm={2}>
                                            VAT
                                        </Col>
                                        <Col md={4} lg={4} sm={4}>
                                            <div className='inputDiv1'>
                                                <input className='input1' value={vatFromDB} onChange={e => { setVatFromDB(e.target.value) }} />%
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={6} lg={6} sm={6} style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', right: '25px' }}>
                                        <div className='inputDiv2'>
                                            <input className='input2' readOnly value={av} /> Tk
                                        </div>
                                        <div className='inputDiv2'>
                                            <input className='input2' readOnly value={cd} /> Tk
                                        </div>
                                        <div className='inputDiv2'>
                                            <input className='input2' readOnly value={rd} /> Tk
                                        </div>
                                        <div className='inputDiv2'>
                                            <input className='input2' readOnly value={sd} /> Tk
                                        </div>
                                        <div className='inputDiv2' style={{ borderBottom: '1.5px solid black' }}>
                                            <input className='input2' readOnly value={vat} /> Tk
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <hr style={{ color: 'black', height: '2px' }} />
                            <Row className='mx-3'>
                                <Col style={{ textAlign: 'center' }} md={4} lg={4} sm={4}>
                                    <h4>Total</h4>
                                </Col>
                                <Col style={{ textAlign: 'end' }} md={8} lg={8} sm={8}>
                                    <h4>{total} TK</h4>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={4} lg={4} sm={4}>
                        <Row>
                            <Col md={6} lg={6} sm={6} style={{ textAlign: 'start' }}>
                                <label className='m-2'>Exchange Rate</label>
                            </Col>
                            <Col md={6} lg={6} sm={6}>
                                <input style={{ textAlign: 'center' }} name='exchangeRate' value={exchangeRate} onChange={(e) => {
                                    setExchangeRate(e.target.value)
                                }}></input>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} lg={6} sm={6} style={{ textAlign: 'start' }}>
                                <label className='m-2'>Product Id</label>
                            </Col>
                            <Col md={6} lg={6} sm={6}>
                                <input style={{ textAlign: 'center' }} name='productID' value={productID} onChange={(e) => {
                                    setProductID(e.target.value)
                                    console.log(e.target.value)
                                    if (e.target.value.length === 7) {
                                        dispatch(detailsProduct(e.target.value))
                                        setUpdate(true)
                                    }
                                }}></input>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Home
