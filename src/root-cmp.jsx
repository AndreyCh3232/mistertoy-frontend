
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { ToyIndex } from './pages/toyIndex.jsx'
import { ToyDetails } from './pages/toyDetails.jsx'
import { GoogleMap } from './cmps/GoogleMap.jsx'
import { MyForm } from './cmps/MyForm.jsx'
import { MyChart } from './cmps/MyChart.jsx'
import { MaterialUi } from './cmps/MaterialUi.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
import { AdminDashboard } from './pages/AdminDashboard.jsx'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

export function App() {
    return (
        <Router>
            <div className='main-app'>
                <AppHeader />
                <main className='container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/toy" element={<ToyIndex />} />
                        <Route path="/toy/:toyId" element={<ToyDetails />} />
                        <Route path="/map" element={<GoogleMap />} />
                        <Route path="/form" element={<MyForm />} />
                        <Route path="/chart" element={<MyChart />} />
                        <Route path="/mui" element={<MaterialUi />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/user" element={<UserProfile />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </main>
                <AppFooter />
            </div>
        </Router>
    )
}
