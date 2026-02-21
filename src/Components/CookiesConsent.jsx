import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-[9999]">
      <p className="text-sm">
        We use cookies to improve your experience on our website.
      </p>
      <div className="flex gap-3">
        <button
          onClick={acceptCookies}
          className="bg-primary px-4 py-2 rounded text-sm"
        >
          Accept
        </button>
        <button
          onClick={declineCookies}
          className="bg-gray-600 px-4 py-2 rounded text-sm"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
