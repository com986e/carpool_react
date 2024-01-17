import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom'

const AddLogin = () => {
    const [adduserId, setAdduserId] = useState("")
    const [addpassword, setAddpassword] = useState("")
    const [addname, setAddname] = useState("")
    const [addemail, setAddemail] = useState("")
    const [addbirthDate, setAddbirthDate] = useState("")
    const [addphoneNum, setAddphoneNum] = useState("")
    const [addmajor, setAddmajor] = useState("")
    const [addsex, setAddsex] = useState("")
    const [addPwCh, setAddPwCh] = useState("")
    const [UsableID, setUsableID] = useState(false)

    const history = useHistory();

    function handleAdduserId(e) {
        e.preventDefault();
        setAdduserId(e.target.value);
    };
    function handleAddpassword(e) {
        e.preventDefault();
        setAddpassword(e.target.value);
    }
    function handleAddname(e) {
        e.preventDefault();
        setAddname(e.target.value);
    }
    function handleAddemail(e) {
        e.preventDefault();
        setAddemail(e.target.value);
    }
    function handleAddbitrhDate(e) {
        e.preventDefault();
        setAddbirthDate(e.target.value);
    }
    function handleAddphoneNum(e) {
        e.preventDefault();
        setAddphoneNum(e.target.value);
    }
    function handleAddmajor(e) {
        e.preventDefault();
        setAddmajor(e.target.value);
    }
    function handleAddsex(e) {
        e.preventDefault();
        setAddsex(e.target.value);
    }
    function handleAddPwCh(e) {
        e.preventDefault();
        setAddPwCh(e.target.value);
    }
    function idCheck(e) {
        
        e.preventDefault();
        fetch("http://localhost:5000/api/login/id")
            .then((res) => (res.json()))
            .then((data) => {
                console.log(data)
                if(adduserId===""){
                    alert("아이디를 입력하세요")
                }else{
                console.log("확인1");
                console.log(data.length);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ID === adduserId) {
                        console.log(adduserId, data[i].ID)
                        alert("존재하는 아이디입니다.")
                        setUsableID(false);
                        break;
                    }else{
                        console.log("확인2")
                        if(i===data.length-1){
                            alert("사용가능한 아이디입니다.")
                            setUsableID(true);
                        }                 
                    }               
                }}           
            })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (UsableID === true) {
            if (addpassword !== addPwCh) {
                return alert('비밀번호와 비밀번호 확인이 다릅니다.')
            } else {
                const userData = {
                    userId: adduserId,
                    password: addpassword,
                    name: addname,
                    email: addemail,
                    birthDate: addbirthDate,
                    phoneNum: addphoneNum,
                    major: addmajor,
                    sex: addsex
                };
                axios.post("http://localhost:5000/api/login", userData)
                    .then((res) => {
                        if(res.status===200){
                            alert("생성이 완료되었습니다.")
                            history.push('/login')
                        }
                    })
            }
        } else if(UsableID === false) {
            alert("아이디 중복체크하세요")
        }
    }



    return (
        <div className='loginMain'>
            <form onSubmit={handleFormSubmit}>
                <h1>회원 가입</h1>
                아이디: <input type='text' name='inputuserId' value={adduserId} onChange={handleAdduserId}></input>{"  "}
                <Button onClick={idCheck}>중복체크</Button><br />
                비밀번호: <input type="password" name='inputpassword' value={addpassword} onChange={handleAddpassword}></input><br />
                비밀번호 확인: <input type="password" name='inputPwCh' value={addPwCh} onChange={handleAddPwCh}></input><br />
                이름: <input type="text" name='inputname' value={addname} onChange={handleAddname}></input><br />
                생년월일: <input type="text" name='inputbirthDate' value={addbirthDate} onChange={handleAddbitrhDate}></input><br />
                이메일: <input type='text' name='inputemail' value={addemail} onChange={handleAddemail}></input><br />
                전화번호: <input type="text" name='inputphoneNum' value={addphoneNum} onChange={handleAddphoneNum}></input><br />
                전공: <input type="text" name='inputmajor' value={addmajor} onChange={handleAddmajor}></input><br />
                성별: <input type="text" name='inputsex' value={addsex} onChange={handleAddsex}></input><br />
                <Button type='submit'>가입</Button> {'  '}
                <Link to='/login'>
                    <Button>돌아가기</Button>
                </Link>
            </form>

        </div>
    )
}

export default AddLogin
