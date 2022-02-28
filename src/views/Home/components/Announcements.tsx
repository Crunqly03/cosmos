import React from 'react'
import { Timeline } from 'react-twitter-widgets'

const Announcements = () => {
  return (
    <>
      <div className="text-2xl text-white mb-2 ">Announcements</div>

    <div className="stat-card relative xxxl ">
      
           <Timeline
            dataSource={{
            sourceType: 'profile',
            screenName: 'robiniaswap',
          }}
          options={{
            height: '327',
            chrome: 'noheader, nofooter  , noborders , noscrollbar',
            width: '100%',


          }

        }

        />
    </div>
    </>
  )
}

export default Announcements
