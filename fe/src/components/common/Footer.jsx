import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className={'cursor-pointer'}>&copy; {new Date().getFullYear()} TanyaPakar</p>
            </div>
        </footer>
    );
};

export default Footer;
