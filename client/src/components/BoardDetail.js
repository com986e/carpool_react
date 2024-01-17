import React, { useEffect, useState } from 'react';
import { Button} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Passenger from './Passenger';
import { Table } from 'react-bootstrap';

const BoardDetail = () => {
    const history = useHistory()
    const location = useLocation();
    const [passenger, setpassenger] = useState("")
    const [major, setmajor] = useState("")
    const [sex, setsex] = useState("")
    const [phoneNum, setphoneNum] = useState("")
    const [comment, setcomment] = useState("")
    const [passengers, setpassengers] = useState("")

    useEffect(()=>{
        fetch(`http://localhost:5000/api/passenger/${location.state.props.title}`)
        .then(res=>res.json())
        .then(data=> {
            setpassengers(data)
        })
    },[])
    
    function handlepassenger(e){
        e.preventDefault();
        setpassenger(e.target.value)
    }
    function handlemajor(e){
        e.preventDefault();
        setmajor(e.target.value)
    }
    function handlesex(e){
        e.preventDefault();
        setsex(e.target.value)
    }
    function handlephoneNum(e){
        e.preventDefault();
        setphoneNum(e.target.value)
    }
    function handlecomment(e){
        e.preventDefault();
        setcomment(e.target.value)
    }
    function sendpassenger(e){
        e.preventDefault();
        console.log(passenger)
        if(sessionStorage.getItem('user_id')===null){
            alert("로그인 후 이용가능합니다.")
        }
        else{
            if(comment === ""){
                alert("값을 입력하세요")
            }else{
                const userData = {
                    UserId: sessionStorage.getItem("user_id"),
                    major: sessionStorage.getItem("user_id"),
                    sex: sessionStorage.getItem("user_id"),
                    phoneNum: sessionStorage.getItem("user_id"),
                    comment: comment,
                    title: location.state.props.title
                }
                axios.post("http://localhost:5000/api/user/passenger",userData)
                .then((res)=>{
                    if(res.status ===200){
                        alert("댓글 생성완료")
                        window.location.reload()
                        
                    }
                })
                
            
            }
        }
    }
    function deleteBoard(e) {
        e.preventDefault();
        
        if (sessionStorage.getItem('user_id') === location.state.props.writer) {
            const url = `http://localhost:5000/api/Board/user/${location.state.props.title}`
            fetch(url, {
                method: 'DELETE'
            })
            history.push('/boardRead')
            console.log("삭제")
        } else {
            alert('자신의 글만 삭제가능합니다.')
        }
    }
    return (
        <div>
            <h1>게시글 상세 페이지</h1>
            <h2>제목</h2>
            <input type='text' value={location.state.props.title} readOnly></input>
            <p></p>
            <h2>출발지</h2>
            <input type='text' value={location.state.props.startProvince} readOnly></input>
            <input type='text' value={location.state.props.startCity} readOnly></input>
            <input type='text' value={location.state.props.startDetail} readOnly></input>
            <h2>도착지</h2>
            <input type='text' value={location.state.props.arrivalProvince} readOnly></input>
            <input type='text' value={location.state.props.arrivalCity} readOnly></input>
            <input type='text' value={location.state.props.arrivalDetail} readOnly></input>
            <h2>작성일</h2>
            <input type='datetime' value={location.state.props.date} readOnly></input>
            <h2>출발예정시각</h2>
            <input type='datetime' value={location.state.props.time} readOnly></input>
            <h2>운전자/동승자</h2>
            <input type='text' value={location.state.props.driver} readOnly></input>
            <h2>최대 동승자 수</h2>
            <input type='text' value={location.state.props.maxPassenger} readOnly></input>
            <h2>차종</h2>
            <input type='text' value={location.state.props.car} readOnly></input>
            <h2>작성자</h2>
            <input type='text' value={location.state.props.writer} readOnly></input>
            <h2>내용</h2>
            <input type='text' value={location.state.props.content} readOnly></input>
            <br /><br />
            <h2>동승 리스트</h2>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>작성자</th>
                        <th>전공</th>
                        <th>성별</th>
                        <th>전화번호</th>
                        <th>신청</th>
                    </tr>
                </thead>
                <tbody>
                    {passengers ? passengers.map(c=>{
                        return (<Passenger
                        
                        UserId = {c.UserId}
                        major = {c.major}
                        sex = {c.sex}
                        phoneNum = {c.phoneNum}
                        comment = {c.comment}
                        title ={c.title}
                        ></Passenger>)
                    }): 
                    <tr>
                        <td>
                            댓글 없음
                        </td>    
                    </tr>}
                </tbody>
            </Table>
            
            <h2>댓글</h2>
            <input type="text" value={comment} onChange={handlecomment}></input>      
            <br></br>
            <Button onClick={sendpassenger}>동승 신청</Button><br></br><br></br> 

            <Link to='/boardRead'>
                <Button>뒤로가기</Button>{'  '}
            </Link>
            <p>
                <br /><Button onClick={deleteBoard}>삭제</Button>
            </p>


        </div>
    );
};

export default BoardDetail;
