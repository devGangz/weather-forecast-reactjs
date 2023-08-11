import img1 from '../image2/02d.png'

import React from 'react';
import {Container, Col, Input} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {inputCityAction, pressEnterAction, GetApi, clearText, pressAfterError} from '../actions/dubaoAction'
import {useSelector, useDispatch} from "react-redux"
import LoadingComponent from '../components/LoadingIcon'

const Background = () => {

    const {inputCity, loadingData, loadingDataError,cityName, inputCity2, showDuLieuA,today,nextDay1,nextDay2,nextDay3,nextDay4} = useSelector((reduxData)=>{
        return reduxData.duBaoReducer
    })

    const dispatch = useDispatch()

    const InputComponent = (event) => {
        dispatch(inputCityAction(event.target.value.replace(" ", "").toLowerCase()))
    }

    const pressKeyEnterComponent = (event) => {
        if(event.key === 'Enter'){
            dispatch(pressEnterAction(event.target.value))
            dispatch(GetApi(inputCity))
        }
    }

    const clearInputWhenError= () => {
        dispatch(clearText())
    }

    const pressKeyEnterComponentAfterError = (event) => {
            dispatch(pressAfterError ())
    }

    const getDayX = (day) => {
        let dayConverted = new Date(day.dt_txt).getDay()
        console.log(dayConverted)
        if(dayConverted == 0) {
            return "Sunday"
        }
        else if(dayConverted === 1) {
            return "Monday"
        }
        else if(dayConverted === 2) {
            return "Tuesday"
        }
        else if(dayConverted === 3) {
            return "Wednesday"
        }
        else if(dayConverted === 4) {
            return "Thursday"
        }
        else if(dayConverted === 5) {
            return "Friday"
        }
        else if(dayConverted === 6) {
            return "Saturday"
        }
    }

        console.log("dữ liệu today",today)
        console.log("dữ liệu ngày tiếp theo 1",nextDay1)
        console.log("dữ liệu ngày tiếp theo 2",nextDay2)
        console.log("dữ liệu ngày tiếp theo 3",nextDay3)
        console.log("dữ liệu ngày tiếp theo 4",nextDay4)


    console.log(loadingDataError)
    return (
        <>
        
        <Container className='d-flex justify-content-center' fluid style={{backgroundImage: `url(${require("../images/background.jpg")})`, backgroundSize:"cover", height:"100vh", width:"100%"}}>
            
            <Col className='shadow-lg' sm = {9} 
            style={{height: "70%", marginTop: "auto", marginBottom: "auto", borderRadius:"30px",
            background: 'rgba(255, 255, 255, 0)'
            }}> 
                <Col sm = {6} className='mx-auto d-flex justify-content-around' style={{marginTop: "-60px"}}>
                    {loadingDataError ? 
                        <Input placeholder ='Tên thành phố không tồn tại !!!' 
                        onChange={clearInputWhenError} value={inputCity2} 
                        onKeyDown = {pressKeyEnterComponentAfterError}>  
                        </Input>
                        : 
                        <Input placeholder ='Bạn muốn xem thời tiết ở thành phố nào?' 
                        onChange={InputComponent} value={inputCity} 
                        onKeyDown = {pressKeyEnterComponent}>  
                        </Input>
                    }
                    {loadingData ? <LoadingComponent></LoadingComponent> : []}
                </Col>
                {showDuLieuA ?
                <Col style={{marginTop: "80px"}}>
                    <Col className='shadow-lg  d-flex justify-content-center mx-auto' sm = {6} style={{background: 'rgba(255, 255, 255, 0)', borderRadius:"30px",marginTop: "30px"}}>
                            <img src = {`https://openweathermap.org/img/wn/${today.weather[0].icon}@4x.png`} style={{width:"80%"}} alt='0'></img>
                        <Col sm = {6} style={{background: 'rgba(255, 255, 255, 0)', borderRadius:"30px",  marginTop: "auto", marginBottom: "auto"}}>
                            <h3>Today</h3>
                            <h1><b>{cityName.charAt(0).toUpperCase() + cityName.slice(1)}</b></h1>
                            <h5>{Math.floor(today.main.temp)}&#176;C</h5>
                            <p>{today.weather[0].description}</p>
                        </Col>
                    </Col>

                    <Col className='d-flex justify-content-around' style={{marginTop: "50px"}}>
                            <Col className='mt-3 shadow-lg mt-2' sm = {2} style={{background: 'rgba(255, 255, 255, 0)', borderRadius:"30px"}}>
                                <h3 style={{marginTop:"20px", marginBottom:"-15px"}}>{getDayX(nextDay1)}</h3>
                                <img src = {`https://openweathermap.org/img/wn/${nextDay1.weather[0].icon}@2x.png`} alt='1'></img>
                                <h5>{Math.floor(nextDay1.main.temp)}&#176;C</h5>
                            </Col>

                            <Col className='mt-3 shadow-lg mt-2' sm = {2} style={{background: 'rgba(255, 255, 255, 0)', borderRadius:"30px"}}>
                                <h3 style={{marginTop:"20px", marginBottom:"-15px"}}>{getDayX(nextDay2)}</h3>
                                <img src = {`https://openweathermap.org/img/wn/${nextDay2.weather[0].icon}@2x.png`} alt='2'></img>
                                <h5>{Math.floor(nextDay2.main.temp)}&#176;C</h5>
                            </Col>

                            <Col className='mt-3 shadow-lg mt-2' sm = {2} style={{background: 'rgba(255, 255, 255, 0)', borderRadius:"30px"}}>
                                <h3 style={{marginTop:"20px", marginBottom:"-15px"}}>{getDayX(nextDay3)}</h3>
                                <img src = {`https://openweathermap.org/img/wn/${nextDay3.weather[0].icon}@2x.png`} alt='3'></img>
                                <h5>{Math.floor(nextDay3.main.temp)}&#176;C</h5>
                            </Col>

                            <Col className='mt-3 shadow-lg mt-2' sm = {2} style={{background: 'rgba(255, 255, 255, 0)', borderRadius:"30px"}}>
                                <h3 style={{marginTop:"20px", marginBottom:"-15px"}}>{getDayX(nextDay4)}</h3>
                                <img src = {`https://openweathermap.org/img/wn/${nextDay4.weather[0].icon}@2x.png`} alt='4'></img>
                                <h5>{Math.floor(nextDay4.main.temp)}&#176;C</h5>
                            </Col>
                    </Col>
                </Col>
                :
                <Col  className='d-flex justify-content-center' style={{marginTop: "110px"}}>
                    <Col  sm ={4}><img src = {img1} alt="img1" width="70%" ></img></Col>
                    <Col style={{color:"#365A7A", marginTop: "auto", marginBottom: "auto", fontSize:"80px"}} sm = {7}><b>Weather Forecast</b></Col> 
                </Col>
                }
                
            </Col>
        </Container>

        </>

    )
}


export default Background