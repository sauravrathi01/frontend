import React from "react";
import "./Service.css";
const Service =()=>{
    return(
        <>
        <div className="container-fluid overflow-hidden p-0">
            <h1 className="text-center servicebg text-white py-4 fw-bold">Our Services</h1>
    
       <div className="my-3 bg-white shadow">
            <h3 className="servicetext py-3 px-2">1. Customizable Digital Business Cards</h3>
            <ul>
                <li>Templates and Personalization: Customized designs, branding, logos, colors, and fonts</li>
                <li>Contact Information: Add details like name, job title, phone number, email, and more.</li>
                <li>QR Code Generation: A scannable code that instantly shares card details.</li>
                <li>Multimedia Integration: Add videos, images, or downloadable files.</li>

               
            </ul>

            <h3 className="servicetext py-3  px-2">2. Sharing Options</h3>
            <ul>
                <li>Cross-Platform Sharing: Share via email, text, social media, NFC, or QR codes.</li>
                <li>Contactless Exchange: Ideal for events, networking, and trade shows.</li>
                <li>Compatibility: Works across iOS, Android, and web browsers.</li>

               
            </ul>

            <h3 className="servicetext py-3 px-2">3. Analytics and Insights</h3>
            <ul>
                <li>Tracking: Monitor when and where your card is viewed or shared.</li>
                <li>Engagement Insights: Metrics like link clicks and profile views.</li>
            </ul>

            <h3 className="servicetext py-3  px-2">4. Integrations with Other Tools</h3>
            <ul>
                <li>CRM Integration: Sync contacts with tools like Salesforce or HubSpot.</li>
                <li>Calendar Links: Add scheduling links for easy meeting setups.</li>
                <li>Email and Social Media Tools: Simplify sharing via platforms like Outlook or LinkedIn.</li>
            </ul>

            <h3 className="servicetext py-3  px-2">5. Team and Enterprise Solutions</h3>
            <ul>
                <li>Employee Cards: Create branded cards for the entire organization.</li>
                <li>Role-Based Features: Include role-specific links or portfolios.</li>
                <li>Admin Dashboard: Manage, update, and track employee cards.</li>
            </ul>

            <h3 className="servicetext py-3  px-2">6. Environment-Friendly Approach</h3>
            <ul>
                <li>Sustainability Messaging: Highlight the eco-friendly nature of digital cards.</li>
                <li>Paperless Campaigns: Promote green initiatives through contactless sharing.</li>
            </ul>

            <h3 className="servicetext py-3  px-2">7. Advanced Features</h3>
            <ul>
                <li>Smart NFC Cards: Physical cards with NFC technology for digital sharing.</li>
                <li>Personalized URLs: Unique web links for every cardholder.</li>
                <li>Multi-Language Support: Create cards in multiple languages for global audiences.</li>
            </ul>

            <h3 className="servicetext py-3  px-2">8. Support and Maintenance</h3>
            <ul className="mb-5 pb-3">
                <li>Customer Support: Dedicated teams for assistance.</li>
                <li>Regular Updates: Ensuring compatibility with the latest devices and platforms.</li>
                <li>Data Backup and Privacy: Secure storage and management of user data.</li>
            </ul>
        </div>
       </div>
        
        </>
    )
}

export default Service;