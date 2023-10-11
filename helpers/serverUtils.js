import debug from "debug";

import User from "../models/authModel";
import Like from "../models/likeModel";

const log = debug('app:serverUtils');

export async function whisperWithInfo(foundWhisper, req) {
 
    const whisperer = await User.findById(foundWhisper.whispererId);
    let whisperStatus = false;
    let likeStatus;
    if (req.user !== undefined) {
      likeStatus = await Like.findOne({likedById: req.user._id, whisperId: foundWhisper._id})
    }
    
    log(likeStatus)
    const {title, image_url, whispererId, whisper, createdAt} = foundWhisper;
    const {username, firstname, lastname} = whisperer;

    if (req.user !== undefined) {
      if (req.user._id === whispererId)
      whisperStatus = true
    }
    
  
    const WhisperWithWhispererInfoAndLinks = Object.assign({},
      {title, likeStatus, whisperStatus,
      image_url, whispererId, whisper, createdAt,username, firstname, lastname}, 
      {links: {filteredBy: `${req.headers.host}/api/whispers/?whispererId=${foundWhisper.whispererId}`} });

      return WhisperWithWhispererInfoAndLinks
  
}