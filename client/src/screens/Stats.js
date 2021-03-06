import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Stats.css';
import studybuddy from '../assets/name-w-blobs.svg';
import UserContext from '../userContext';
import { PieChart } from 'react-minimal-pie-chart';

function Stats() {
    const context = useContext(UserContext);
    const history = useHistory();

    function displayPieChart() {

        return (
            <PieChart 
            animate = {true}
            data={generateData()}
            />
        )
    }

    function displayTitle() {
        const today = new Date();
        const month = today.getMonth();
        const day = today.getDate();
        const year = today.getFullYear();
        const months = ["january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"];
        const selectedMonthName = months[month];
        return (
            <h2 id="sessionTitle">stats for session on {selectedMonthName} {day}, {year} </h2>
        )
    }

    function displayChartInfo() {
        return (
            <h2 id="chartInfo">{Math.floor(context.productive)} minutes productive, {Math.floor(context.slack)} minutes unproductive, {Math.floor(context.timeOnBreak)} minutes on break</h2>
        )
    }
    function displayStats() {
        return (
            <div id="stats">
                {displayChartInfo()}
                <h2 class="stat">{context.sips} drinks of water taken</h2>
                <h2 class="stat">your posture was bad for {Math.floor(context.goodPostureTime)} minutes</h2>
            </div>
        )

    }
    function generateData(){
        console.log(context.sessionTimeMinutes);
        const data = [
            { title: `productive time: ${Math.floor(context.productive)} minutes`, key: 'productive time', value: context.productive, color: '#00A9B4' },
            { title: `wasted time: ${Math.floor(context.slack)} minutes`, key: 'wasted time', value: context.slack, color: '#AAFAFF' },
            { title: `break time: ${Math.floor(context.timeOnBreak)} minutes`, key: 'break time', value: context.timeOnBreak, color: '#00747F' },
        ]
        return data;
    }
    return (
        <div id="screen">
             <div className="container">
                <img id="logo" src={studybuddy} alt="studybuddy's logo"></img>
                <button id="newSession" className="stats-btn" onClick={() => history.push('/')}>start new session</button>
            </div>
            <div id="innerSection">
                {displayTitle()}
                <div id="pieChart">{displayPieChart()}</div>
                <h3>here's how you did:</h3>
                {displayStats()}
                
            </div>
        </div>
    )
}

export default Stats
