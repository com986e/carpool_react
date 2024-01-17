import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Table } from 'react-bootstrap'
import Board from './Board';




const BoardRead = () => {
    const [board, setBoard] = useState([])
    const [title, setTitle] = useState("")
    const [date, setdate] = useState("")
    const [time, settime] = useState("")
    const [startProvince, setstartProvince] = useState("")
    const [startCity, setstartCity] = useState("")
    const [startDetail, setstartDetail] = useState("")
    const [arrivalProvince, setarrivalProvince] = useState("")
    const [arrivalCity, setarrivalCity] = useState("")
    const [arrivalDetail, setarrivalDetail] = useState("")
    const [content, setContent] = useState("")
    const [myBoard, setMyBoard] = useState([])

    


    function boardRead(e) {
        e.preventDefault();
        fetch("http://localhost:5000/api/board")
            .then((res) => (res.json()))
            .then((data) => {
                setBoard(data)

            })
    }
    function myboardRead(e){
        e.preventDefault();
        fetch(`http://localhost:5000/api/board/user/${sessionStorage.getItem('user_id')}`)
        .then((res)=>(res.json()))
        .then(data=>{
            setBoard(data)
        })
    }


    return (
        <div>
            <h1>게시글 조회</h1>
            <Button onClick={boardRead}>전체 조회</Button> {'  '}
            <Button onClick={myboardRead}>내 글 조회</Button> {'  '}
            <Link to='/'>
                <Button>뒤로가기</Button>
            </Link>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>출발지</th>
                        <th>출발지</th>
                        <th>출발지</th>
                        <th>도착지</th>
                        <th>도착지</th>
                        <th>도착지</th>
                        <th>작성일</th>
                        <th>출발예정시각</th>
                        <th>운전자/동승자</th>
                        <th>최대 동승자 수</th>
                        <th>차종</th>
                        <th>작성자</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                    {board ? board.map(c=>{
                        return (<Board
                        id={c.ind}
                        title={c.title}

                        startProvince={c.startProvince}
                        startCity={c.startCity}
                        startDetail={c.startDetail}
                        arrivalProvince={c.arrivalProvince}
                        arrivalCity={c.arrivalCity}
                        arrivalDetail={c.arrivalDetail}

                        date={c.date}
                        time={c.time}

                        driver={c.driver}
                        maxPassenger={c.maxPassenger}
                        car={c.car}

                        content={c.content}

                        writer={c.writer}
                        ></Board>)
                    }): 
                    <tr>
                        <td>
                            게시글 없음
                        </td>    
                    </tr>}
                </tbody>
            </Table>
        </div>
    )
};

export default BoardRead;
