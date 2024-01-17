import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Main from './Main';
import axios from 'axios';

const BoardWrite = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    // const [writer, setWriter]= useState("")
    const [startProvince, setstartProvince] = useState("")
    const [startCity, setstartCity] = useState("")
    const [startDetail, setstartDetail] = useState("")
    const [arrivalProvince, setarrivalProvince] = useState("")
    const [arrivalCity, setarrivalCity] = useState("")
    const [arrivalDetail, setarrivalDetail] = useState("")
    const [date, setdate] = useState("")
    const [time, settime] = useState("")
    const [driver, setdriver] = useState("")
    const [maxPassenger, setmaxPassenger] = useState("")
    const [car, setcar] = useState("")
    const [content, setContent] = useState("")

    


    function handleTitle(e){
        e.preventDefault();
        setTitle(e.target.value)
    }
    function handlestartProvince(e){
        e.preventDefault();
        setstartProvince(e.target.value)
    }
    function handlestartCity(e){
        e.preventDefault();
        setstartCity(e.target.value)
    }
    function handlestartDetail(e){
        e.preventDefault();
        setstartDetail(e.target.value)
    }
    function handlearrivalProvince(e){
        e.preventDefault();
        setarrivalProvince(e.target.value)
    }
    function handlearrivalCity(e){
        e.preventDefault();
        setarrivalCity(e.target.value)
    }
    function handlearrivalDetail(e){
        e.preventDefault();
        setarrivalDetail(e.target.value)
    }
    function handledate(e){
        e.preventDefault();
        setdate(e.target.value)
    }
    function handletime(e){
        e.preventDefault();
        settime(e.target.value)
    }
    function handledriver(e){
        e.preventDefault();
        setdriver(e.target.value)
    }
    function handlemaxPassenger(e){
        e.preventDefault();
        setmaxPassenger(e.target.value)
    }
    function handlecar(e){
        e.preventDefault();
        setcar(e.target.value)
    }
    function handleContent(e){
        e.preventDefault();
        setContent(e.target.value)
    }
    function mainGo(e) {
        e.preventDefault();
        history.push({
            pathname: '/'
        })
    }
    function writeboard(e){
        e.preventDefault();
        // setWriter(sessionStorage.getItem('user_id'))
        const userData = {
            title : title,
            startProvince: startProvince,
            startCity: startCity,
            startDetail: startDetail,
            arrivalProvince: arrivalProvince,
            arrivalCity: arrivalCity,
            arrivalDetail: arrivalDetail,
            date: date,
            time: time,
            driver: driver,
            maxPassenger: maxPassenger,
            car: car,
            content : content,
            writer: sessionStorage.getItem('user_id')
        }
        axios.post("http://localhost:5000/api/board", userData)
            .then((res)=> {
                if(res.status===200){
                    alert("생성이 완료되었습니다.")
                    history.push('/')
                }
                else{
                    alert("생성이 실패하였습니다.")
                }
            })

    }
    return (
        <div>
            <Main></Main>
            <div className='Board'>
                <h1>게시글 작성 {' '}<Button onClick={mainGo}>메인으로</Button></h1>
                <h4>제목</h4><input type="text" name="title" value={title} onChange={handleTitle}></input><br /><br />
                <h4>출발지</h4><input type="text" name="startProvince" value={startProvince} onChange={handlestartProvince}></input><input type="text" name="startCity" value={startCity} onChange={handlestartCity}></input><input type="text" name="startDetail" value={startDetail} onChange={handlestartDetail}></input>
                <h4>도착지</h4><input type="text" name="arrivalProvince" value={arrivalProvince} onChange={handlearrivalProvince}></input><input type="text" name="arrivalCity" value={arrivalCity} onChange={handlearrivalCity}></input><input type="text" name="arrivalDetail" value={arrivalDetail} onChange={handlearrivalDetail}></input><br /><br />
                <h4>작성일</h4><input type="datetime" name="date"  value={date} onChange={handledate} disabled></input><br />
                <h4>출발예정시각</h4><input type="datetime" name="time"  value={time} onChange={handletime}></input><br />
                <h4>운전자/동승자</h4><input type="text" name="driver" value={driver} onChange={handledriver}></input><br /><br />
                <h4>최대 동승자 수</h4><input type="text" name="maxPassenger" value={maxPassenger} onChange={handlemaxPassenger}></input><br /><br />
                <h4>차종</h4><input type="text" name="car" value={car} onChange={handlecar}></input><br /><br />
                <br/><h4>내용</h4>
                <textarea name = "content" value={content} onChange={handleContent}></textarea>
                <br/>
                <Button onClick={writeboard}>작성</Button>
            </div>
        </div>
    )
};

export default BoardWrite;
