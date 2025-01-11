import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import styled from 'styled-components';
import logo from '../assets/react.png';

const Nav = styled.nav`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const Container = styled.div`
  max-width: 7xl;
  margin: 0 auto;
  padding: 0 1rem;
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const Logo = styled.img`
  height: 3.5rem;
  width: 3.5rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
`;

const ProfileImage = styled.img`
  height: 2rem;
  width: 2rem;
  border-radius: 9999px;
`;

const ProfileName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const LogoutButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: #718096;
  background: none;
  border-radius: 0.375rem;
  transition: color 0.2s;
  &:hover {
    color: #4a5568;
  }
  &:focus {
    outline: none;
  }
`;

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Nav>
      <Container>
        <FlexContainer>
          <Logo src={logo} alt="Logo" />
          <ProfileContainer>
            <ProfileImage
              src="https://ui-avatars.com/api/?name=Marcelo&background=0D8ABC&color=fff"
              alt="Profile"
            />
            <ProfileName>Marcelo</ProfileName>
            <LogoutButton onClick={handleLogout}>
              <LogOut size={18} className="mr-2" />
              Sair
            </LogoutButton>
          </ProfileContainer>
        </FlexContainer>
      </Container>
    </Nav>
  );
};