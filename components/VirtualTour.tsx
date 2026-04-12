import React from 'react';
import { Pannellum } from 'pannellum-react';
export const VirtualTour = ({ imageUrl }: { imageUrl: string }) => (
  <div style={{ width: '100%', height: '350px', marginTop: '30px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)' }}>
    <Pannellum width="100%" height="100%" image={imageUrl} pitch={10} yaw={180} hfov={110} autoLoad />
  </div>
);
