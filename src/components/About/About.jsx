import React from 'react';
import './styles.scss'

const About = () => {
    return (
        <div className="container">
            <p className="fz16 lh18 c-black300">The tool allows to see general trends of salaries on Armenian IT market.</p>
            <p className="fz16 lh18 c-black300">Salaries are after taxes in Armenian Drams.</p>
            <p className="fz16 lh18 c-black300">The reported data is being translated to English and reviewed to exclude spam.</p>
            <p className="fz16 lh18 c-black300">If a person reported “350” salary, we make an assumption that it means 350 thousand AMD. </p>
            <p className="fz16 lh18 c-black300">You might request the data you submitted to be removed. To do it drop me an email to rafael[at]rahar[dot]net.</p>
            <p className="fz16 lh18 c-black300">Data is licensed under Open Data Commons Attribution License (ODC-By) v1, and available for download here.</p>
            
            <p className="fz16 lh18 c-black300 mt30">How this work:</p>
            <ol className="ol">
                <li className="li fz16 lh18 c-black300">You click on "Submit my report" button on the left;</li>
                <li className="li fz16 lh18 c-black300">You fill-in a simple form and submit the data. That"s it. No authentication or personal data needed.</li>
            </ol>
        </div>
    )
}

export default About 