import React from "react";

const Header = ({setTestMode}) => {
  return (
    <header>
      <div className="navbar-container">
        <a className="title" href="/">
          <div className="title-container">
            <img src="data:image/webp;base64,UklGRhgDAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSIcBAAARkHRrmyHJ6qNt27ZtrXpsW0vbtm3bs/TMyrZtTzpqkv21sioiIiYA2RhTXhyLaJZ+kNUveTSmyYqKJ9DYIPzHwmIaK3iJY1bR2MqKPLOOxk4WS8JqGpsYLIlraez/a8HSRhqzP1gs4koaU/+qMl5DIfez3mAYT5OJpXyCVh9nknHu+xlMv09yss2122Ow+knvADurPEsP6mCjeLLex84sdPEVDDZrb1cEm7R7JgNR7eUAhJDv0DM8tP7n0rEPAB83nv7QCgC+0QnNEmRo2fBrY2FAz8eg/xgcmrX2t9pCBXnT2I8fRe3HkZFl7gjZT3mrYG6+I0KuBSMO/OT+MX+2jLlz/viKSlfU0mntdywxm+1QS7fCOccunxlSN6Q6wAmZbvouiew6ZGoXWtk/B1ltt+wTlv4tMiPosPIdltiFFFxX/cZYXG1Pzn0PlhX5iCMxu6QniqLCizR7UkVHeFnTdW1PJaGaLwCGRQaAX2PITPrF3Zvdt+/Mq5+/HiITURKCWg2PD7IGAFZQOCBqAQAA0AwAnQEqIAAgAD4xCoxGIhERDAAgAwS2AE6ZQjzPxr8VfwA6VXd3lVytvgD+yflH/JdwA9QDkAPf/6QD+gf1X1AP8B7AH6AewB5Qv7O/AB+tv7aezN//yOHVLl+yaNBrx+WenR16MQ0b2LEu464AAP7//uRjfyOviu05sR+ZWaNWcTrGaPF/3WHLU/Dr3+yO1l3A5CfPS+6kQLvc82qA/a6NfzjpnW0uTD8Q+32z0swHIeUYega8v++c///TunFKcAHMtvzbMHN/wDbsM2TvO/oW7o/r9NMqJNTaZDNN12fatRxX2vmtegkI4UONTE6Oy3wf3MtV+tCBULnlocmUIs/7EsQ4pam+K68/vx/cnZ03LUfTJc0kQP9+ppnI025F8qJem6kJDSIAtvSv+6exx4DYUeO7m40//Q4B4+I5kdcpY+7NvBOYaS3pkN9+T834QmiscoYcmat8gFUprow4R96U7xtc7EcJAAA=" />
            <h1>Air Field Driving Practice Test</h1>
          </div>
        </a>
        <div className="test-mode" style={{display: 'flex', gap: '20px'}} >
          <button onClick={() => setTestMode(false)} className='testMode-button'>Practice Mode</button>
          <button onClick={() => setTestMode(true)} className='testMode-button'>Test Mode</button>
        </div>
        <nav className="navbar">
          <a
            className="nav-link"
            href="https://static.e-publishing.af.mil/production/1/af_a3/publication/dafi13-213/dafi13-213.pdf"
            target="_blank"
          >
            DAFI 13-213
          </a>
          <a
            className="nav-link"
            href="https://static.e-publishing.af.mil/production/1/dyessafb/publication/afi13-213_dyessafbsup/afi13-213_dyessafbsup.pdf"
            target="_blank"
          >
            DAFI 13-213, Dyess Supp
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
