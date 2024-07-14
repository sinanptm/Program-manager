import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';

const AdminOutlet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if(location.pathname.includes('program-details')){
      setActiveSection('programs')
    }else{
      setActiveSection(path || 'participants');
    }
  }, [location]);

  const handleNavigation = (section) => {
    setActiveSection(section);
    navigate(`/admin/${section}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-around mb-2">
        <Button
          size="small"
          variant={activeSection === 'participants' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleNavigation('participants')}
        >
          Participants
        </Button>
        <Button
          size="small"
          variant={activeSection === 'teams' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleNavigation('teams')}
        >
          Teams
        </Button>
        <Button
          size="small"
          variant={activeSection === 'programs' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleNavigation('programs')}
        >
          Programs
        </Button>
      </div>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminOutlet;
