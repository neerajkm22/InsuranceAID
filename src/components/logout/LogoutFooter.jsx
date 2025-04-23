import questionIcon from '../../assets/icons/question.svg'

const LogoutFooter = () => {
  return (
    <footer className="footer">
			<div className="container-fluid">
            <div className="row">
                <div className="bot-note">Bot-generated data may contain errors. Kindly verify for accuracy</div>					
                    <span className="chatinfo">
                        <img src={questionIcon} alt="search BrokerAiD" height="18" />
                    </span>					
                <div className="right-reserved">©  NSEIT Limited Product. All rights reserved.</div>
            </div>
        </div>
    </footer>
  )
}

export default LogoutFooter