"use server"
import React from 'react'
import LoginGoogle from '@/components/Login/LoginGoogle'
import styles from './signin.module.css'

const SignIn = () => {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h1>
                    Sign In With google
                </h1>
                <hr />
                <LoginGoogle/>
            </section>
        </div>
    )
}

export default SignIn