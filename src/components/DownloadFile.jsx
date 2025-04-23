import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

const DownloadFile = ({ url }) => {
    if (!url) {
        return null; // If there's no URL, don't render anything
    }

    // Extract the file name from the URL
    const fileName = url.split('/').pop();

    return (
        <a href={url} download={fileName} target="_blank" rel="noopener noreferrer" title='Click to download'>
             &nbsp; ...Read more <FontAwesomeIcon icon={faPaperclip} />
        </a>
    );
};

export default DownloadFile;