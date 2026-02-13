import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-[#111F35] text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#F63049] to-[#D02752] bg-clip-text text-transparent">
            AI-Powered Delivery Post Office Identification & Tracking System
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            An intelligent logistics solution leveraging artificial intelligence to automatically identify optimal post offices, track parcels in real-time, and predict delivery timelines with unprecedented accuracy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              to="/book"
              className="bg-[#F63049] hover:bg-[#D02752] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book Parcel
            </Link>
            <Link
              to="/track"
              className="bg-transparent border-2 border-[#F63049] hover:bg-[#F63049] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Track Parcel
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#111F35] to-[#8A244B] bg-opacity-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Key Features
          </h2>
          <p className="text-center text-gray-300 mb-16 text-lg">
            Cutting-edge technology for seamless delivery management
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <Link to="/book" className="block bg-[#111F35] border border-[#8A244B] rounded-xl p-8 hover:border-[#F63049] transition-all duration-300 shadow-lg hover:shadow-2xl text-left group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#F63049] transition-colors">
                AI Address Understanding
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Advanced natural language processing algorithms parse and comprehend complex address formats, incomplete information, and regional variations to ensure accurate delivery routing.
              </p>
            </Link>

            {/* Feature 2 */}
            <Link to="/book" className="block bg-[#111F35] border border-[#8A244B] rounded-xl p-8 hover:border-[#F63049] transition-all duration-300 shadow-lg hover:shadow-2xl text-left group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#F63049] transition-colors">
                Post Office Identification
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Machine learning models analyze geographic data, postal zones, and operational metrics to automatically identify the most efficient post office for parcel processing and dispatch.
              </p>
            </Link>

            {/* Feature 3 */}
            <Link to="/track" className="block bg-[#111F35] border border-[#8A244B] rounded-xl p-8 hover:border-[#F63049] transition-all duration-300 shadow-lg hover:shadow-2xl text-left group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#F63049] transition-colors">
                Real-Time Parcel Tracking
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Comprehensive end-to-end visibility with real-time status updates, GPS location tracking, and instant notifications at every milestone of the delivery journey.
              </p>
            </Link>

            {/* Feature 4 */}
            <Link to="/prediction" className="block bg-[#111F35] border border-[#8A244B] rounded-xl p-8 hover:border-[#F63049] transition-all duration-300 shadow-lg hover:shadow-2xl text-left group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#F63049] transition-colors">
                AI Delivery Prediction
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Predictive analytics engine processes historical data, traffic patterns, weather conditions, and operational constraints to generate accurate delivery time estimates with confidence intervals.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-[#111F35]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-[#F63049] mb-2">99.8%</div>
              <div className="text-gray-300 text-sm">Accuracy Rate</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[#F63049] mb-2">24/7</div>
              <div className="text-gray-300 text-sm">Live Tracking</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[#F63049] mb-2">&lt;2min</div>
              <div className="text-gray-300 text-sm">Processing Time</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[#F63049] mb-2">AI-First</div>
              <div className="text-gray-300 text-sm">Technology</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;