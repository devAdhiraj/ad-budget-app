import type { NextPage, GetServerSideProps, NextPageContext } from 'next'
import Head from 'next/head'
import styles from '../styles/Login.module.css'
import {Button, Card, Row, Col, Container} from "react-bootstrap"
import FirebaseServer from '../helpers/firebase-server'
import verifyAuth from '../helpers/verify-auth'
import { useContext } from 'react'
import AuthContext from '../components/auth-context'

const Login: NextPage = () => {
  const ctx = useContext(AuthContext)
  return (
    <div className={styles.container}>
      <Head>
        <title>AD-Budget Login</title>
        <meta name="description" content="Sign in to start budgeting and planning with convenience." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Card className={styles.card}>
          <Card.Body>
          <Container>
          <Col>
            <Row>
              <h2>
                Sign in
              </h2>
            </Row>
            <Row>
              <p>
                Track your budget, simple UI, secure, access on multiple devices.
              </p>
            </Row>
            <Row>
              <p>
              Get started by signing in with google.
              </p>
            </Row>
            <Row>
              <Button onClick={ctx.login}>Sign in</Button>
            </Row>
          </Col>
          </Container>
          </Card.Body>
        </Card>
      </main>
    </div>
  )
}

export const getServerSideProps = async ({req, res}: NextPageContext) => {
  try{
    if(req && req.headers && req.headers.cookie && await verifyAuth(req.headers.cookie)){
      if(req.headers.type === "redirect"){
        res?.setHeader(
          "Set-Cookie", [
             `ad-token=deleted; Max-Age=0`,
          ]
          );
          return {props:{}}
      }
      return {
        redirect: {
          destination: "/",
          permanent: false,
          headers: [
            {type: "redirect"}
          ]
        }
      }
    }
    FirebaseServer();
    return { 
      props: {}
    }
  } catch(err){
    return {
      props: {}
    }
  }
}

export default Login
