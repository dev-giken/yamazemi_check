import { FC } from 'react';
// Font Awesomeから各種アイコンをインポート
import { faXTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialIcons: FC = () => (
  <div className="flex space-x-4">
    <a href="https://x.com/yamazemi2025" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6 text-white hover:text-gray-400" />
    </a>
    <a href="https://www.instagram.com/yamazemi2025/" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 text-white hover:text-gray-400" />
    </a>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hidden"> {/* hiddenに設定 */}
      <FontAwesomeIcon icon={faFacebook} className="w-6 h-6 text-white hover:text-gray-400" />
    </a>
  </div>
);

export default SocialIcons;
