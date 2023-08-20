import React, { useState, useRef, useContext } from 'react'
import { Dialog, TextField, Typography, Button, Alert, AlertTitle, styled } from '@mui/material'
import { authenticateSignup, authenticateLogin } from '../../service/api'
import DataProvider, { DataContext, LoginContext } from '../../context/DataProvider'
const signUpInitial = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    phone: ""

}
const alreadyExists = {
    user: false,
    email: false,
}
const initialValidation = {
    email: false,
    phone: false,
    password: false,
    firstName: false,
    lastName: false,
    userName: false,
}
const initalLogin = {
    logine: "",
    loginp: ""
}
const Notification = styled(Alert)(({ theme }) => ({
    position: 'fixed',
    zIndex: '10',
    width: '20%',
    right: '5px',
    top: '5px',
    [theme.breakpoints.down('md')]: {
        height: '36px',
        width: '199px'
    }
}))
const Login = ({ open, setOpen }) => {

    const [checkExist, setExist] = useState(alreadyExists)
    const [signUp, setSignup] = useState(signUpInitial)
    const [trigger, setTrigger] = useState(true)
    const [ok, setOk] = useState(false)
    const [registered, setRegister] = useState(false)
    const [validation, setValidation] = useState(initialValidation)
    const [login, setLogin] = useState(initalLogin)
    const { account, setAccount } = useContext(DataContext)
    const [validLogin, setValidLogin] = useState(true)

    // console.log(validation)
    const focus = useRef()
    const loginUser = async () => {
        try {
            const res = await authenticateLogin(login)
            if (res.name === 'AxiosError') {
                throw res
            }
            else {
                handleClose()
                setAccount(res.data.data.User.firstName)
            }
        }
        catch (err) {
            setValidLogin(false)
        }
    }
    const handleClose = () => {
        setOpen(false)
        setTrigger(true)
        setExist({ ...checkExist, [checkExist.user]: false, [checkExist.email]: false })
        setOk(false)
        setValidation(initialValidation)
        setLogin(initalLogin)
        setValidLogin(true)
        // setSignup(signUpInitial)
    }
    const handleTrigger = () => {

        if (trigger) {
            setValidation(initialValidation)
            setSignup(signUpInitial)
            setTrigger(false)
        }
        else {
            setLogin(initalLogin)
            setValidation(initialValidation)
            setTrigger(true)
        }
        // setLogin(initalLogin)
        // setValidation(initialValidation)
        // setSignup(signUpInitial)
    }
    const signUpHandle = async () => {
        try {
            const res = await authenticateSignup(signUp)
            if (res.name === 'AxiosError') {
                throw res
            }
            else {
                // console.log(res.data)
                // setAccount(signUp.firstName)
                handleClose()
                setRegister(true)
                setTimeout(() => { setRegister(false) }, 3000)
                // setAccount(signUp.firstName)
            }
        }
        catch (err) {
            if (err?.response?.data?.message?.includes('required')) {
                const ok = {}
                for (const obj in initialValidation) {
                    // console.log(obj)
                    if (err.response.data.message.includes(obj)) {
                        ok[obj] = true
                    }
                }
                setValidation({ ...validation, ...ok })
                console.log(validation)
            }
            else if (err?.response?.data?.message?.includes('username')) {
                console.log(err.response)
                setExist({ ...checkExist, user: true })
            }
            else if (err?.response?.data?.message?.includes('email')) {
                console.log(err.response.data.message)
                setExist({ ...checkExist, email: true })
            }
        }
    }
    const loginChangeHandler = (e) => {
        setValidLogin(true)
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    const changeHandler = (e) => {
        if (e.target.name === 'userName') {

            setExist({ ...checkExist, user: false })
            if (e.target.value === '') {
                setValidation({ ...validation, userName: true })
            }
            else {
                setValidation({ ...validation, userName: false })
            }
        }
        else if (e.target.name === 'email') {
            setExist({ ...checkExist, email: false })

            if (e.target.value === '') {
                setValidation({ ...validation, email: true })
            }
            else {
                setValidation({ ...validation, email: false })
            }
        }
        else if (e.target.name === 'password') {

            if (e.target.value === '') {
                setValidation({ ...validation, password: true })
            }
            else {
                setValidation({ ...validation, password: false })
            }
        }
        else if (e.target.name === 'lastName') {
            console.log('e.target.name')
            if (e.target.value === '') {
                setValidation({ ...validation, lastName: true })
            }
            else {
                setValidation({ ...validation, lastName: false })
            }
        }
        else if (e.target.name === 'firstName') {
            if (e.target.value === '') {
                setValidation({ ...validation, firstName: true })
            }
            else {
                setValidation({ ...validation, firstName: false })
            }
        }
        else {
            if (e.target.value === '') {
                setValidation({ ...validation, phone: true })
            }
            else {
                setValidation({ ...validation, phone: false })
            }
        }
        setSignup({ ...signUp, [e.target.name]: e.target.value })
    }
    return (
        <>
            {registered ? <Notification severity="success">
                <AlertTitle>Success</AlertTitle>
                User registered successfully
            </Notification> : <></>}
            <Dialog open={open} onClose={handleClose}>

                {trigger ?
                    <div style={{ boxSizing: 'border-box', display: "flex", height: '500px', overFlow: 'hidden' }}>
                        <div style={{ width: '37%', background: '#1976d2', paddingLeft: '1.3rem', paddingTop: '2rem', paddingRight: '0.5rem' }}>
                            <Typography style={{ fontSize: '1.5rem', color: 'white' }}>Login</Typography>
                            <Typography style={{ marginTop: '1rem', fontSize: '1rem', color: 'white' }}>Get access to your Orders,Wishlist and Recommendations</Typography>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '63%', padding: '2rem 1.5rem' }}>
                            <TextField variant='standard' label='Enter Username' InputLabelProps={{ style: { fontSize: "15px", fontFamily: "emoji" } }} value={login.logine} name='logine' onChange={(e) => loginChangeHandler(e)} autoComplete='off' />
                            <TextField variant='standard' label='Enter Password' type='password' InputLabelProps={{ style: { fontSize: "15px", fontFamily: "emoji" } }} value={login.loginp} name="loginp" onChange={(e) => loginChangeHandler(e)} autoComplete='off' />
                            {!validLogin ? <Typography style={{ color: 'red', fontFamily: 'emoji', marginBottom: '-15px', fontWeight: 'bold', fontSize: '12px' }}>*invalid login credentials</Typography> : <></>}
                            <div style={{ position: 'relative', top: '5%' }}>
                                <Typography style={{ textAlign: 'left', margin: '2% auto', fontSize: '0.9rem', fontStyle: 'italic' }}>By continuing,you agree to BuyMore's Terms of Use and Privacy Policy.</Typography>
                                <Button style={{ background: '#1976d2', color: 'white', width: '100%', margin: '0 auto' }} onClick={() => loginUser()}>Login</Button>
                                {/* <Typography style={{ textAlign: 'center', position: 'relative', top: '2.5%' }}>OR</Typography>
                            <Button style={{ background: 'white', color: '#1976d2', width: '100%', margin: '0 auto', position: 'relative', top: '5%', boxShadow: '0.5px 0.5px 1.5px black' }}> Request OTP</Button> */}
                            </div>
                            <Typography style={{ textAlign: 'center', marginTop: '15rem' }}><a href='#' style={{ textDecoration: 'none', color: '#2874f0' }} onClick={() => { handleTrigger() }}>New To BuyMore? create an account</a></Typography>
                        </div>
                    </div>
                    :
                    <div style={{ boxSizing: 'border-box', display: "flex", height: '540px', overFlow: 'hidden' }}>
                        <div style={{ width: '37%', background: '#1976d2', paddingLeft: '1.3rem', paddingTop: '2rem', paddingRight: '0.5rem' }}>
                            <Typography style={{ fontSize: '1.5rem', color: 'white' }}>Looks like you're new here!</Typography>
                            <Typography style={{ marginTop: '1rem', color: 'white' }}>Sign up to get started</Typography>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '63%', padding: '0.9rem 1.5rem 0.5rem 1.5rem' }}>

                            {validation.firstName ? <TextField variant='standard' label='*Enter Firstname' onChange={(e) => changeHandler(e)} name='firstName' InputLabelProps={{ style: { color: 'red', fontSize: "15px", fontFamily: "emoji" } }} value={signUp.firstName} autoComplete='off' /> : <TextField variant='standard' label='Enter Firstname' onChange={(e) => changeHandler(e)} name='firstName' InputLabelProps={{ style: { fontSize: "15px", fontFamily: "emoji" } }} value={signUp.firstName} autoComplete='off' />}
                            {validation.lastName ? <TextField variant='standard' label='*Enter Lastname' onChange={(e) => changeHandler(e)} name='lastName' InputLabelProps={{ style: { color: 'red', fontSize: "15px", fontFamily: "emoji" } }} value={signUp.lastName} autoComplete='off' /> : <TextField variant='standard' label='Enter Lastname' onChange={(e) => changeHandler(e)} name='lastName' InputLabelProps={{ style: { fontSize: "15px", fontFamily: "emoji" } }} value={signUp.lastName} autoComplete='off' />}
                            {validation.userName ? <TextField variant='standard' label='*Enter Username' onChange={(e) => changeHandler(e)} name='userName' InputLabelProps={{ style: { color: 'red', fontSize: "15px", fontFamily: "emoji" } }} value={signUp.userName} autoComplete='off' /> : <TextField variant='standard' label='Enter Username' onChange={(e) => changeHandler(e)} name='userName' InputLabelProps={{ style: { fontSize: "15px", fontFamily: "emoji" } }} value={signUp.userName} autoComplete='off' />}
                            {checkExist.user ? <div style={{ color: 'red' }}>*user already exists</div> : <div></div>}
                            {validation.email ? <TextField variant='standard' label='*Enter Email' onChange={(e) => changeHandler(e)} name='email' InputLabelProps={{ style: { color: 'red', fontSize: "15px", fontFamily: "emoji" } }} value={signUp.email} autoComplete='off' type='email' /> : <TextField variant='standard' label='Enter Email' onChange={(e) => changeHandler(e)} name='email' InputLabelProps={{ style: { fontSize: "15px", fontFamily: "emoji" } }} value={signUp.email} autoComplete='off' type='email' />}
                            {checkExist.email ? <div style={{ color: 'red' }}>*email already exists</div> : <div></div>}
                            {validation.password ? <TextField variant='standard' label='*Enter Password' type='password' onChange={(e) => changeHandler(e)} name='password' ref={focus} InputLabelProps={{ style: { color: 'red', fontSize: "15px", fontFamily: "emoji" } }} value={signUp.password} autoComplete='off' /> : <TextField variant='standard' type='password' label='Enter Password' onChange={(e) => changeHandler(e)} name='password' ref={focus} InputLabelProps={{ style: { fontSize: "15px", fontFamily: "emoji" } }} value={signUp.password} autoComplete='off' />}
                            {validation.phone ? <TextField variant='standard' label='*Enter Phone' onChange={(e) => changeHandler(e)} name='phone' InputLabelProps={{ style: { color: 'red', fontSize: "15px", fontFamily: "emoji" } }} value={signUp.phone} autoComplete='off' /> : <TextField variant='standard' label='Enter Phone' onChange={(e) => changeHandler(e)} name='phone' InputLabelProps={{ style: { fontSize: "15px", fontFamily: "emoji" } }} value={signUp.phone} autoComplete='off' />}
                            <div style={{ position: 'relative', top: '5%' }}>
                                <Typography style={{ textAlign: 'left', margin: '2% auto', fontSize: '0.9rem', fontStyle: 'italic' }}>By continuing,you agree to BuyMore's Terms of Use and Privacy Policy.</Typography>
                                <Button style={{ background: '#1976d2', color: 'white', width: '100%', margin: '3% auto' }} onClick={() => signUpHandle()}>Sign Up</Button>
                                <Button style={{ background: 'white', color: '#1976d2', width: '100%', margin: '0 auto', position: 'relative', top: '5%', boxShadow: '0.5px 0.5px 1.5px black' }} onClick={() => { handleTrigger() }}> Existing User?Log in</Button>
                            </div>
                            <Typography style={{ textAlign: 'center', marginTop: '10rem' }}></Typography>
                        </div>
                    </div>
                }
            </Dialog >
        </>
    )
}

export default Login