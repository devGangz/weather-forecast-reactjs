import img1 from '../image2/02d.png'
import React from 'react';
import { Container, Col, Input, Row } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { inputCityAction, pressEnterAction, GetApi, clearText, pressAfterError } from '../actions/dubaoAction'
import { useSelector, useDispatch } from "react-redux"
import LoadingComponent from '../components/LoadingIcon'


const Background = () => {
    const { inputCity, loadingData, loadingDataError, cityName, inputCity2, showDuLieuA, today, nextDay1, nextDay2, nextDay3, nextDay4 } = useSelector((reduxData) => {
        return reduxData.duBaoReducer
    })

    const dispatch = useDispatch()

    const InputComponent = (event) => {
        dispatch(inputCityAction(event.target.value.replace(" ", "").toLowerCase()))
    }

    const pressKeyEnterComponent = (event) => {
        if (event.key === 'Enter') {
            dispatch(pressEnterAction(event.target.value))
            dispatch(GetApi(inputCity))
        }
    }

    const clearInputWhenError = () => {
        dispatch(clearText())
    }

    const pressKeyEnterComponentAfterError = (event) => {
        dispatch(pressAfterError())
    }

    const getDayX = (day) => {
        let dayConverted = new Date(day.dt_txt).getDay()
        console.log(dayConverted)
        if (dayConverted == 0) {
            return "Sunday"
        }
        else if (dayConverted === 1) {
            return "Monday"
        }
        else if (dayConverted === 2) {
            return "Tuesday"
        }
        else if (dayConverted === 3) {
            return "Wednesday"
        }
        else if (dayConverted === 4) {
            return "Thursday"
        }
        else if (dayConverted === 5) {
            return "Friday"
        }
        else if (dayConverted === 6) {
            return "Saturday"
        }
    }

    console.log("dữ liệu today", today.dt_txt)
    console.log("dữ liệu ngày tiếp theo 1", nextDay1)
    console.log("dữ liệu ngày tiếp theo 2", nextDay2)
    console.log("dữ liệu ngày tiếp theo 3", nextDay3)
    console.log("dữ liệu ngày tiếp theo 4", nextDay4)


    console.log(loadingDataError)
    return (
        <>

            <Container className='d-flex justify-content-center coverImage' fluid
                style={{ backgroundImage: `url(${require("../images/background.jpg")})`, width: "100%" }}>
                <Col className='shadow-lg coverImage-sub' sm={9}
                    style={{
                        borderRadius: "30px",
                        background: 'rgba(255, 255, 255, 0)'
                    }}>
                    <Col sm={6} className='mx-auto d-flex justify-content-around' style={{ marginTop: "-60px" }}>
                        {loadingDataError ?
                            // Large monitor - min-width: 1024px
                            <Col xs={12} md={12}>
                                <Input placeholder='Tên thành phố không tồn tại !!!'
                                    onChange={clearInputWhenError} value={inputCity2}
                                    onKeyDown={pressKeyEnterComponentAfterError}>
                                </Input>
                            </Col>
                            :
                            <Col xs={12} md={12}>
                                <Input placeholder='Bạn muốn xem thời tiết ở thành phố nào?'
                                    onChange={InputComponent} value={inputCity}
                                    onKeyDown={pressKeyEnterComponent}>
                                </Input>
                            </Col>

                        }
                        {loadingData ? <LoadingComponent></LoadingComponent> : []}
                    </Col>
                    {showDuLieuA ?
                        <div>
                            <Col style={{ marginTop: "70px" }} >
                                <Col className='shadow-lg  d-flex justify-content-center mx-auto' xs={10} sm={6} style={{ background: 'rgba(255, 255, 255, 0)', borderRadius: "30px", marginTop: "30px" }}>
                                    <Col xs={8} style={{ marginLeft: "-3rem" }}>
                                        <img src={`https://openweathermap.org/img/wn/${today.weather[0].icon}@4x.png`} style={{ width: "80%" }} alt='0'></img>
                                    </Col>
                                    <Col sm={6} style={{ background: 'rgba(255, 255, 255, 0)', borderRadius: "30px", marginTop: "auto", marginBottom: "auto", marginLeft: "-2rem" }}>
                                        <h3 className='mt-2'>Today</h3>
                                        <p>
                                            {today.dt_txt.charAt(8)}
                                            {today.dt_txt.charAt(9)}
                                            {today.dt_txt.charAt(7)}
                                            {today.dt_txt.charAt(5)}
                                            {today.dt_txt.charAt(6)}
                                            {today.dt_txt.charAt(4)}
                                            {today.dt_txt.charAt(0)}
                                            {today.dt_txt.charAt(1)}
                                            {today.dt_txt.charAt(2)}
                                            {today.dt_txt.charAt(3)}
                                        </p>
                                        <h1><b>{cityName.charAt(0).toUpperCase() + cityName.slice(1)}</b></h1>
                                        <h5>{Math.floor(today.main.temp)}&#176;C</h5>
                                        <p>{today.weather[0].description}</p>
                                    </Col>
                                </Col>
                                {/* Larger Monitor */}
                                <Col className='d-none d-lg-flex justify-content-around' style={{ marginTop: "50px" }} >
                                    <Col className='mt-3 shadow-lg mt-2 ' sm={2} style={{ background: 'rgba(255, 255, 255, 0)', borderRadius: "30px" }}>
                                        <h3 className='' style={{ marginTop: "20px", marginBottom: "-15px" }}>{getDayX(nextDay1)}</h3>
                                        <p className='mt-3 '>
                                            {nextDay1.dt_txt.charAt(8)}
                                            {nextDay1.dt_txt.charAt(9)}
                                            {nextDay1.dt_txt.charAt(7)}
                                            {nextDay1.dt_txt.charAt(5)}
                                            {nextDay1.dt_txt.charAt(6)}
                                            {nextDay1.dt_txt.charAt(4)}
                                            {nextDay1.dt_txt.charAt(0)}
                                            {nextDay1.dt_txt.charAt(1)}
                                            {nextDay1.dt_txt.charAt(2)}
                                            {nextDay1.dt_txt.charAt(3)}
                                        </p>
                                        <div className=''>
                                            <img style={{ margin: "-2rem" }} src={`https://openweathermap.org/img/wn/${nextDay1.weather[0].icon}@2x.png`} alt='1'></img>
                                        </div>

                                        <h5 className='mt-4 '>{Math.floor(nextDay1.main.temp)}&#176;C</h5>
                                        <p className=''>{nextDay1.weather[0].description}</p>
                                    </Col>

                                    <Col className='mt-3 shadow-lg mt-2 ' sm={2} style={{ background: 'rgba(255, 255, 255, 0)', borderRadius: "30px" }}>
                                        <h3 style={{ marginTop: "20px", marginBottom: "-15px" }}>{getDayX(nextDay2)}</h3>
                                        <p className='mt-3'>
                                            {nextDay2.dt_txt.charAt(8)}
                                            {nextDay2.dt_txt.charAt(9)}
                                            {nextDay2.dt_txt.charAt(7)}
                                            {nextDay2.dt_txt.charAt(5)}
                                            {nextDay2.dt_txt.charAt(6)}
                                            {nextDay2.dt_txt.charAt(4)}
                                            {nextDay2.dt_txt.charAt(0)}
                                            {nextDay2.dt_txt.charAt(1)}
                                            {nextDay2.dt_txt.charAt(2)}
                                            {nextDay2.dt_txt.charAt(3)}
                                        </p>
                                        <div className=''>
                                            <img style={{ margin: "-2rem" }} src={`https://openweathermap.org/img/wn/${nextDay2.weather[0].icon}@2x.png`} alt='2'></img>
                                        </div>

                                        <h5 className='mt-4 '>{Math.floor(nextDay2.main.temp)}&#176;C</h5>
                                        <p className=''>{nextDay2.weather[0].description}</p>
                                    </Col>

                                    <Col className='mt-3 shadow-lg mt-2 ' sm={2} style={{ background: 'rgba(255, 255, 255, 0)', borderRadius: "30px" }}>
                                        <h3 style={{ marginTop: "20px", marginBottom: "-15px" }}>{getDayX(nextDay3)}</h3>
                                        <p className='mt-3'>
                                            {nextDay3.dt_txt.charAt(8)}
                                            {nextDay3.dt_txt.charAt(9)}
                                            {nextDay3.dt_txt.charAt(7)}
                                            {nextDay3.dt_txt.charAt(5)}
                                            {nextDay3.dt_txt.charAt(6)}
                                            {nextDay3.dt_txt.charAt(4)}
                                            {nextDay3.dt_txt.charAt(0)}
                                            {nextDay3.dt_txt.charAt(1)}
                                            {nextDay3.dt_txt.charAt(2)}
                                            {nextDay3.dt_txt.charAt(3)}
                                        </p>
                                        <div className=''>
                                            <img style={{ margin: "-2rem" }} src={`https://openweathermap.org/img/wn/${nextDay3.weather[0].icon}@2x.png`} alt='3'></img>
                                        </div>

                                        <h5 className='mt-4 '>{Math.floor(nextDay3.main.temp)}&#176;C</h5>
                                        <p className=''>{nextDay3.weather[0].description}</p>
                                    </Col>

                                    <Col className='mt-3 shadow-lg mt-2 ' sm={2} style={{ background: 'rgba(255, 255, 255, 0)', borderRadius: "30px" }}>
                                        <h3 style={{ marginTop: "20px", marginBottom: "-15px" }}>{getDayX(nextDay4)}</h3>
                                        <p className='mt-3'>
                                            {nextDay4.dt_txt.charAt(8)}
                                            {nextDay4.dt_txt.charAt(9)}
                                            {nextDay4.dt_txt.charAt(7)}
                                            {nextDay4.dt_txt.charAt(5)}
                                            {nextDay4.dt_txt.charAt(6)}
                                            {nextDay4.dt_txt.charAt(4)}
                                            {nextDay4.dt_txt.charAt(0)}
                                            {nextDay4.dt_txt.charAt(1)}
                                            {nextDay4.dt_txt.charAt(2)}
                                            {nextDay4.dt_txt.charAt(3)}
                                        </p>
                                        <div className=''>
                                            <img style={{ margin: "-2rem" }} src={`https://openweathermap.org/img/wn/${nextDay4.weather[0].icon}@2x.png`} alt='4'></img>
                                        </div>

                                        <h5 className='mt-4 '>{Math.floor(nextDay4.main.temp)}&#176;C</h5>
                                        <p className=''>{nextDay4.weather[0].description}</p>
                                    </Col>
                                </Col>

                            </Col>

                            {/* Mobile Monitor */}
                            <Row className='d-lg-none justify-content-around'>
                                <Col className='mt-3 mx-4 d-flex justify-content-around shadow-lg mt-2'
                                    style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: "10px" }}>
                                    <div className='d-flex align-items-center mt-3 '>
                                        <div>
                                            <h5 className='text-align-center'>{getDayX(nextDay1)}</h5>
                                            <p>
                                                {nextDay1.dt_txt.charAt(8)}
                                                {nextDay1.dt_txt.charAt(9)}
                                                {nextDay1.dt_txt.charAt(7)}
                                                {nextDay1.dt_txt.charAt(5)}
                                                {nextDay1.dt_txt.charAt(6)}
                                                {nextDay1.dt_txt.charAt(4)}
                                                {nextDay1.dt_txt.charAt(0)}
                                                {nextDay1.dt_txt.charAt(1)}
                                                {nextDay1.dt_txt.charAt(2)}
                                                {nextDay1.dt_txt.charAt(3)}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={`https://openweathermap.org/img/wn/${nextDay1.weather[0].icon}@2x.png`} alt='1'></img>
                                    </div>

                                    <div className='d-flex align-items-center mt-3 '>
                                        <div>
                                            <h5>{Math.floor(nextDay1.main.temp)}&#176;C</h5>
                                            <p>{nextDay1.weather[0].description}</p>
                                        </div>
                                    </div>
                                </Col>


                                <Col className='mt-3 mx-4 d-flex justify-content-around shadow-lg mt-2' style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: "10px" }}>
                                    <div className='d-flex align-items-center mt-3'>
                                        <div>
                                            <h5 className='text-align-center'>{getDayX(nextDay2)}</h5>
                                            <p>
                                                {nextDay2.dt_txt.charAt(8)}
                                                {nextDay2.dt_txt.charAt(9)}
                                                {nextDay2.dt_txt.charAt(7)}
                                                {nextDay2.dt_txt.charAt(5)}
                                                {nextDay2.dt_txt.charAt(6)}
                                                {nextDay2.dt_txt.charAt(4)}
                                                {nextDay2.dt_txt.charAt(0)}
                                                {nextDay2.dt_txt.charAt(1)}
                                                {nextDay2.dt_txt.charAt(2)}
                                                {nextDay2.dt_txt.charAt(3)}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={`https://openweathermap.org/img/wn/${nextDay2.weather[0].icon}@2x.png`} alt='1'></img>
                                    </div>

                                    <div className='d-flex align-items-center mt-3'>
                                        <div>
                                            <h5>{Math.floor(nextDay2.main.temp)}&#176;C</h5>
                                            <p>{nextDay2.weather[0].description}</p>
                                        </div>
                                    </div>
                                </Col>

                                <Col className='mt-3 mx-4 d-flex justify-content-around shadow-lg mt-2' style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: "10px" }}>
                                    <div className='d-flex align-items-center mt-3'>
                                        <div>
                                            <h5 className='text-align-center'>{getDayX(nextDay3)}</h5>
                                            <p>
                                                {nextDay3.dt_txt.charAt(8)}
                                                {nextDay3.dt_txt.charAt(9)}
                                                {nextDay3.dt_txt.charAt(7)}
                                                {nextDay3.dt_txt.charAt(5)}
                                                {nextDay3.dt_txt.charAt(6)}
                                                {nextDay3.dt_txt.charAt(4)}
                                                {nextDay3.dt_txt.charAt(0)}
                                                {nextDay3.dt_txt.charAt(1)}
                                                {nextDay3.dt_txt.charAt(2)}
                                                {nextDay3.dt_txt.charAt(3)}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={`https://openweathermap.org/img/wn/${nextDay3.weather[0].icon}@2x.png`} alt='1'></img>
                                    </div>

                                    <div className='d-flex align-items-center mt-3'>
                                        <div>
                                            <h5>{Math.floor(nextDay3.main.temp)}&#176;C</h5>
                                            <p>{nextDay3.weather[0].description}</p>
                                        </div>
                                    </div>
                                </Col>

                                <Col className='mt-3 mx-4 d-flex justify-content-around shadow-lg mt-2' style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: "10px" }}>
                                    <div className='d-flex align-items-center mt-3'>
                                        <div>
                                            <h5 className='text-align-center'>{getDayX(nextDay4)}</h5>
                                            <p>
                                                {nextDay4.dt_txt.charAt(8)}
                                                {nextDay4.dt_txt.charAt(9)}
                                                {nextDay4.dt_txt.charAt(7)}
                                                {nextDay4.dt_txt.charAt(5)}
                                                {nextDay4.dt_txt.charAt(6)}
                                                {nextDay4.dt_txt.charAt(4)}
                                                {nextDay4.dt_txt.charAt(0)}
                                                {nextDay4.dt_txt.charAt(1)}
                                                {nextDay4.dt_txt.charAt(2)}
                                                {nextDay4.dt_txt.charAt(3)}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={`https://openweathermap.org/img/wn/${nextDay4.weather[0].icon}@2x.png`} alt='1'></img>
                                    </div>

                                    <div className='d-flex align-items-center mt-3'>
                                        <div>
                                            <h5>{Math.floor(nextDay4.main.temp)}&#176;C</h5>
                                            <p>{nextDay4.weather[0].description}</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        :
                        <Row className='d-flex justify-content-center homepageLargeScreen' style={{ marginTop: "110px" }}>
                            {/* Large monitor - min-width: 1024px */}
                            <Col className='largeMonitorHome' xs={12} sm={4}><img src={img1} alt="img1" width="70%" ></img></Col>
                            <Col className='largeMonitorHome' style={{ color: "#365A7A", marginTop: "auto", marginBottom: "auto", fontSize: "80px" }} sm={7} xs={12}><b>Weather Forecast</b></Col>
                            {/* Mobile monitor - max-width: 414px */}
                            <Col className='mobileMonitorHome' style={{ marginTop: "-1rem" }} xs={12} sm={4}><img src={img1} alt="img1" width="70%" ></img></Col>
                            <Col className='mobileMonitorHome' style={{ color: "#365A7A", fontSize: "40px" }} sm={7} xs={12}><b>Weather Forecast</b></Col>
                        </Row>
                    }
                </Col>
            </Container >
        </>
    )
}



export default Background