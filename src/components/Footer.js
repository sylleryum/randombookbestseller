import React from 'react';

const nytlogo = 'https://developer.nytimes.com/files/poweredby_nytimes_30b.png?v=1583354208352';
const nyturl = 'https://developer.nytimes.com/'
const grLogo = 'http://d.gr-assets.com/misc/1454549125-1454549125_goodreads_misc.png';
const grUrl = 'https://www.goodreads.com/api'

const Footer = (props) => {
    return (
        <footer className="text-center p-1 m-0 bg-footer">
            <h6 className="p-0 m-0">
                Data provided by:&nbsp;
                <a href={nyturl}><img src={nytlogo}/></a>
                <a href={grUrl}><img src={grLogo}/></a>&nbsp;
                | An open source created by: <a href="https://github.com/sylleryum">https://github.com/sylleryum</a></h6>

        </footer>
    );
};

export default Footer;
