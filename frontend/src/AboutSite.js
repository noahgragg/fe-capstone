import React from 'react'

const AboutSite = () => {
  return (
    <div className='about-container'>
        <div className='about-body'>
            <h1 className='about-header'>About the page</h1>
                <> Welcome! This page was designed for students from Operation Level Up! Cohort group 15 to post their
                developer information, project links, and LinkedIn profiles as a one stop landing page for their professional
                endeavors as Software Engineers. The following techonologies were used in the development of this page:
                </>
            <div className='tech-list-container'>
                <div className='front-end-list'>
                    <ul className='about-list'>Front-end:</ul>
                        <li className='about-list'>React</li>
                        <li className='about-list'>CSS</li>
                </div>
                <div className='back-end-list'>
                    <ul className='about-list'>Back-end:</ul>
                        <li className='about-list'>PostgreSQL</li>
                        <li className='about-list'>RESTful API</li>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutSite
