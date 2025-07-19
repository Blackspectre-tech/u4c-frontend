import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ProgressBar,
  Nav,
} from "react-bootstrap";
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("supported");

  const statsData = [
    {
      title: "Total Contributed",
      value: "$425",
      subtitle: "Across 3 campaigns",
      icon: "fas fa-dollar-sign",
      color: "#60a5fa",
    },
    {
      title: "Campaigns Created",
      value: "2",
      subtitle: "$50,000 total raised",
      icon: "fas fa-bullhorn",
      color: "#f472b6",
    },
    {
      title: "Active Campaigns",
      value: "4",
      subtitle: "Currently funding",
      icon: "fas fa-chart-line",
      color: "#fb923c",
    },
    {
      title: "Success Rate",
      value: "85%",
      subtitle: "Of supported campaigns",
      icon: "fas fa-users",
      color: "#34d399",
    },
  ];

  const supportedCampaigns = [
    {
      id: 1,
      title: "Revolutionary Solar Panel Technology",
      company: "GreenTech Innovations",
      raised: 75000,
      goal: 100000,
      backers: 234,
      daysLeft: 15,
      contribution: 250,
      status: "Active",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      id: 2,
      title: "Smart Home Security System",
      company: "SecureHome Inc",
      raised: 45000,
      goal: 60000,
      backers: 156,
      daysLeft: 8,
      contribution: 100,
      status: "Active",
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      id: 3,
      title: "AI-Powered Healthcare Assistant",
      company: "MedTech Solutions",
      raised: 120000,
      goal: 150000,
      backers: 387,
      daysLeft: 22,
      contribution: 200,
      status: "Active",
      image: "https://picsum.photos/600/400?random=3",
    },
    {
      id: 4,
      title: "Sustainable Urban Farming Kit",
      company: "GrowLocal Initiative",
      raised: 32000,
      goal: 45000,
      backers: 178,
      daysLeft: 12,
      contribution: 150,
      status: "Active",
      image: "https://picsum.photos/600/400?random=4",
    },
  ];

  const myCampaigns = [
    {
      id: 3,
      title: "Eco-Friendly Water Bottle",
      company: "EcoLife Products",
      raised: 25000,
      goal: 25000,
      backers: 89,
      daysLeft: 0,
      contribution: 75,
      status: "Funded",
      image: "https://picsum.photos/600/400?random=5",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Active: { bg: "#3b82f6", text: "Active" },
      Funded: { bg: "#10b981", text: "Funded" },
      Ended: { bg: "#6b7280", text: "Ended" },
    };

    const style =
      statusStyles[status as keyof typeof statusStyles] || statusStyles.Active;
    return (
      <span className="badge-custom" style={{ backgroundColor: style.bg }}>
        {style.text}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const CampaignCard = ({ campaign }: { campaign: any }) => {
    const progressPercentage = (campaign.raised / campaign.goal) * 100;

    return (
      <Col xl={4} lg={6} md={6} className="mb-4">
        <div className="modern-campaign-card h-100">
          <div className="modern-image-container">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="modern-campaign-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // Try local fallback first
                if (!target.src.includes("/assets/")) {
                  target.src = "/assets/img/hero/hero-one-big.jpg";
                } else {
                  // If local image also fails, use a solid color background
                  target.style.display = "none";
                  target.parentElement!.style.background =
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                }
              }}
              onLoad={() => {
                console.log(`Image loaded successfully: ${campaign.title}`);
              }}
            />
            <div className="modern-status-badge">
              {getStatusBadge(campaign.status)}
            </div>
            <div className="modern-image-overlay"></div>
          </div>

          <div className="modern-card-content">
            <div className="modern-card-header">
              <h3 className="modern-campaign-title">{campaign.title}</h3>
              <p className="modern-company-name">by {campaign.company}</p>
            </div>

            <div className="modern-funding-section">
              <div className="modern-funding-amounts">
                <div className="modern-raised">
                  <span className="amount">
                    {formatCurrency(campaign.raised)}
                  </span>
                  <span className="label">raised</span>
                </div>
                <div className="modern-goal">
                  <span className="amount">
                    {formatCurrency(campaign.goal)}
                  </span>
                  <span className="label">goal</span>
                </div>
              </div>

              <div className="modern-progress-wrapper">
                <div className="modern-progress-track">
                  <div
                    className="modern-progress-fill"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
                <span className="modern-progress-text">
                  {Math.round(progressPercentage)}%
                </span>
              </div>

              <div className="modern-campaign-stats">
                <div className="stat-item">
                  <i className="fas fa-users"></i>
                  <span>{campaign.backers} backers</span>
                </div>
                <div className="stat-item">
                  <i className="fas fa-clock"></i>
                  <span>
                    {campaign.daysLeft > 0
                      ? `${campaign.daysLeft} days left`
                      : "Ended"}
                  </span>
                </div>
              </div>
            </div>

            <div className="modern-contribution-footer">
              <div className="contribution-amount">
                <span className="contribution-label">Your contribution</span>
                <span className="contribution-value">
                  {formatCurrency(campaign.contribution)}
                </span>
              </div>
              <button className="modern-action-btn">
                <i className="fas fa-external-link-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </Col>
    );
  };

  return (
    <DashboardLayout>
      <style>{`
        .dashboard-header {
          margin-bottom: 2rem;
        }
        
        .dashboard-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.5rem;
          border-left: 4px solid #dc2626;
          padding-left: 1rem;
        }
        
        .dashboard-subtitle {
          color: #6b7280;
          font-size: 1rem;
          margin-bottom: 0;
        }
        
        .create-btn {
          background: linear-gradient(135deg, #ec4899 0%, #f97316 100%);
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-weight: 600;
          color: white;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        
        .create-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
        }
        
        .stats-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          height: 100%;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .stats-card:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        
        .stats-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          font-size: 1.25rem;
          color: white;
        }
        
        .stats-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.25rem;
          line-height: 1;
        }
        
        .stats-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.25rem;
        }
        
        .stats-subtitle {
          font-size: 0.75rem;
          color: #9ca3af;
        }
        
        .campaign-tabs {
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 2rem;
        }
        
        .nav-tab-custom {
          border: none;
          background: none;
          color: #6b7280;
          font-weight: 600;
          padding: 1rem 0;
          margin-right: 2rem;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 0.875rem;
        }
        
        .nav-tab-custom:hover {
          color: #374151;
        }
        
        .nav-tab-custom.active {
          color: #111827;
          border-bottom-color: #3b82f6;
        }
        
        /* Modern Campaign Card Styles */
        .modern-campaign-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(229, 231, 235, 0.6);
          display: flex;
          flex-direction: column;
        }
        
        .modern-campaign-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          border-color: rgba(59, 130, 246, 0.2);
        }
        
        .modern-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        
        .modern-campaign-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
          margin: 0;
          padding: 0;
          border: none;
          display: block;
          background: #f3f4f6;
          opacity: 1;
          visibility: visible;
        }
        
        .modern-campaign-card:hover .modern-campaign-image {
          transform: scale(1.05);
        }
        
        .modern-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .modern-campaign-card:hover .modern-image-overlay {
          opacity: 1;
        }
        
        .modern-status-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 2;
        }
        
        .badge-custom {
          background: rgba(59, 130, 246, 0.9);
          backdrop-filter: blur(8px);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .modern-card-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .modern-card-header {
          margin-bottom: 20px;
        }
        
        .modern-campaign-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #111827;
          line-height: 1.3;
          margin: 0 0 8px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .modern-company-name {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
          font-weight: 500;
        }
        
        .modern-funding-section {
          flex: 1;
          margin-bottom: 20px;
        }
        
        .modern-funding-amounts {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        
        .modern-raised, .modern-goal {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .modern-goal {
          align-items: flex-end;
        }
        
        .modern-raised .amount, .modern-goal .amount {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          line-height: 1;
        }
        
        .modern-raised .label, .modern-goal .label {
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 2px;
        }
        
        .modern-progress-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .modern-progress-track {
          flex: 1;
          height: 6px;
          background: #f1f5f9;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .modern-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 3px;
          transition: width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
        }
        
        .modern-progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .modern-progress-text {
          font-size: 0.875rem;
          font-weight: 700;
          color: #3b82f6;
          min-width: 40px;
          text-align: right;
        }
        
        .modern-campaign-stats {
          display: flex;
          justify-content: space-between;
          gap: 16px;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }
        
        .stat-item i {
          font-size: 0.75rem;
          color: #9ca3af;
        }
        
        .modern-contribution-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }
        
        .contribution-amount {
          display: flex;
          flex-direction: column;
        }
        
        .contribution-label {
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        
        .contribution-value {
          font-size: 1rem;
          font-weight: 700;
          color: #059669;
        }
        
        .modern-action-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .modern-action-btn:hover {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .dashboard-header {
            text-align: center;
          }
          
          .dashboard-title {
            font-size: 1.5rem;
          }
          
          .create-btn {
            width: 100%;
            margin-top: 1rem;
          }
          
          .nav-tab-custom {
            margin-right: 1rem;
            font-size: 0.8rem;
          }
          
          .stats-card {
            margin-bottom: 1rem;
          }
        }
        
        @media (max-width: 576px) {
          .modern-image-container {
            height: 180px;
          }
          
          .modern-card-content {
            padding: 20px;
          }
          
          .modern-campaign-title {
            font-size: 1rem;
          }
          
          .modern-raised .amount, .modern-goal .amount {
            font-size: 1.125rem;
          }
          
          .modern-campaign-stats {
            flex-direction: column;
            gap: 8px;
          }
          
          .dashboard-title {
            font-size: 1.25rem;
            text-align: left;
          }
          
          .modern-status-badge {
            top: 12px;
            right: 12px;
          }
          
          .badge-custom {
            font-size: 9px;
            padding: 4px 10px;
          }
        }
      `}</style>

      <Container fluid>
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="dashboard-title">Dashboard</h1>
              <p className="dashboard-subtitle">
                Welcome back! Here's your crowdfunding overview
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Button className="create-btn">
                <i className="fas fa-plus me-2"></i>
                Create Campaign
              </Button>
            </Col>
          </Row>
        </div>

        {/* Stats Cards */}
        <Row className="mb-4">
          {statsData.map((stat, index) => (
            <Col lg={3} md={6} className="mb-3" key={index}>
              <Card className="stats-card">
                <div
                  className="stats-icon"
                  style={{ backgroundColor: stat.color }}
                >
                  <i className={stat.icon}></i>
                </div>
                <div className="stats-value">{stat.value}</div>
                <div className="stats-title">{stat.title}</div>
                <div className="stats-subtitle">{stat.subtitle}</div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Campaign Tabs */}
        <div className="campaign-tabs">
          <div className="d-flex">
            <button
              className={`nav-tab-custom ${
                activeTab === "supported" ? "active" : ""
              }`}
              onClick={() => setActiveTab("supported")}
            >
              Supported Campaigns
            </button>
            <button
              className={`nav-tab-custom ${
                activeTab === "my-campaigns" ? "active" : ""
              }`}
              onClick={() => setActiveTab("my-campaigns")}
            >
              My Campaigns
            </button>
          </div>
        </div>

        {/* Campaign Cards */}
        <Row>
          {activeTab === "supported" &&
            supportedCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}

          {activeTab === "my-campaigns" &&
            myCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
        </Row>

        {/* Empty State */}
        {((activeTab === "supported" && supportedCampaigns.length === 0) ||
          (activeTab === "my-campaigns" && myCampaigns.length === 0)) && (
          <div className="text-center py-5">
            <i
              className="fas fa-inbox"
              style={{ fontSize: "3rem", color: "#d1d5db" }}
            ></i>
            <h4 className="text-muted mt-3">No campaigns found</h4>
            <p className="text-muted">
              {activeTab === "supported"
                ? "You haven't supported any campaigns yet. Explore and support campaigns you care about!"
                : "You haven't created any campaigns yet. Start your first campaign today!"}
            </p>
            <Button className="create-btn mt-3">
              {activeTab === "supported"
                ? "Explore Campaigns"
                : "Create Campaign"}
            </Button>
          </div>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default Dashboard;
