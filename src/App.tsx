import React, { Suspense } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import NavbarComponent from '../src/components/NavBar/NavBarComponent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

// Lazy load components
const HomeComponent = React.lazy(() => import('./components/Home/HomeComponent'));
const MachineLearningComponent = React.lazy(() => import('../src/components/MachineLearning/MachineLearningComponent'));
const WebDesignComponent = React.lazy(() => import('../src/components/WebDesign/WebDesignComponent'));
const TrainingComponent = React.lazy(() => import('../src/components/Training/TrainingComponent'));
const LoginComponent = React.lazy(() => import('./components/LogIn/LoginComponent'));
const SearchResults = React.lazy(() => import('../src/components/SearchResults/SearchResultsComponent'));
const ContactComponent = React.lazy(() => import('../src/components/Contact/ContactComponent'));
const VCardPage = React.lazy(() => import('../src/components/vCard/vCardPage'));
const CustomerDiscoverySurvey = React.lazy(() => import('../src/components/CustomerDiscovery/CustomerDiscoveryComponent'));

function App() {
  return (
    <Authenticator.Provider>
      <NavbarComponent />
      <div className="container-fluid">
        <div className="row justify-content-center"> {/* Center content */}
          <div className="col-lg-8 col-md-10 col-sm-12"> {/* Responsive column */}
            <Suspense fallback={<div className="text-center">Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/machine-learning" element={<MachineLearningComponent />} />
                <Route path="/web-design" element={<WebDesignComponent />} />
                <Route path="/training" element={<TrainingComponent />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/contact" element={<ContactComponent />} />
                <Route path="/vcard" element={<VCardPage />} />
                <Route path="/cd" element={<CustomerDiscoverySurvey />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Authenticator.Provider>
  );
}

export default App;
