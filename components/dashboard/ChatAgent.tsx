'use client'; // This is required if you are using the App Router

import Script from 'next/script';
import { useEffect } from 'react';

// Replace these placeholders with your actual values
const RECOMI_AGENT_ID = "9796c4e4-1bcf-4dbb-87bc-0ad9c03ca4a0"; 
const RECOMI_DOMAIN = "https://recomi-app.powerdrill.ai";

const ChatAgent = () => {
  // We use useEffect to replicate the original snippet's window.onload logic
  useEffect(() => {
    const onLoad = () => {
      const script = document.createElement("script");
      script.src = `${RECOMI_DOMAIN}/RecomiSDK.umd.cjs`;
        
      // *** This ensures the attributes are set EXACTLY as required ***
      script.setAttribute("agentId", RECOMI_AGENT_ID); 
      script.setAttribute("domain", RECOMI_DOMAIN);
      
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
    
    // Cleanup event listener if component unmounts
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // Return null because the script is added via a side effect (useEffect)
  return null;
};

export default ChatAgent;