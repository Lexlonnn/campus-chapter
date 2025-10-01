import { useState, useEffect, useCallback } from "react";
import styles from "./Team.module.css";
import data from "../../../data.json";

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);

  // Organize team members with categories
  const teamMembers = [
    // Core Team (3 members)
    {
      id: "1",
      name: data.team.staffAdvisor.name,
      role: data.team.staffAdvisor.role,
      image: data.team.staffAdvisor.image,
      category: "Core Team",
    },
    {
      id: "2",
      name: data.team.campusLead.name,
      role: data.team.campusLead.role,
      image: data.team.campusLead.image,
      category: "Core Team",
    },
    {
      id: "3",
      name: data.team.campusCoLead.name,
      role: data.team.campusCoLead.role,
      image: data.team.campusCoLead.image,
      category: "Core Team",
    },
    // Creative Team (2 members)
    {
      id: "4",
      name: data.team.creativeMember1?.name || "Creative Member 1",
      role: data.team.creativeMember1?.role || "Creative Lead",
      image: data.team.creativeMember1?.image || "/placeholder.svg",
      category: "Creative Team",
    },
    {
      id: "5",
      name: data.team.creativeMember2?.name || "Creative Member 2",
      role: data.team.creativeMember2?.role || "Creative Designer",
      image: data.team.creativeMember2?.image || "/placeholder.svg",
      category: "Creative Team",
    },
    // Design Team (2 members)
    {
      id: "6",
      name: data.team.DesignLead?.name || "Design Lead",
      role: data.team.DesignLead?.role || "Design Lead",
      image: data.team.DesignLead?.image || "/placeholder.svg",
      category: "Design Team",
    },
    {
      id: "7",
      name: data.team.designMember2?.name || "Design Member 2",
      role: data.team.designMember2?.role || "UI/UX Designer",
      image: data.team.designMember2?.image || "/placeholder.svg",
      category: "Design Team",
    },
    // Media Team (3 members)
    {
      id: "8",
      name: data.team.mediaLead?.name || "Media Lead",
      role: data.team.mediaLead?.role || "Media Lead",
      image: data.team.mediaLead?.image || "/placeholder.svg",
      category: "Media Team",
    },
    {
      id: "9",
      name: data.team.mediaMember2?.name || "Media Member 2",
      role: data.team.mediaMember2?.role || "Social Media Manager",
      image: data.team.mediaMember2?.image || "/placeholder.svg",
      category: "Media Team",
    },
    {
      id: "10",
      name: data.team.mediaMember3?.name || "Media Member 3",
      role: data.team.mediaMember3?.role || "Content Strategist",
      image: data.team.mediaMember3?.image || "/placeholder.svg",
      category: "Media Team",
    },
    // Technical Team (2 members)
    {
      id: "11",
      name: data.team.technicalLead?.name || "Technical Lead",
      role: data.team.technicalLead?.role || "Technical Lead",
      image: data.team.technicalLead?.image || "/placeholder.svg",
      category: "Technical Team",
    },
    {
      id: "12",
      name: data.team.techMember2?.name || "Tech Member 2",
      role: data.team.techMember2?.role || "Full Stack Developer",
      image: data.team.techMember2?.image || "/placeholder.svg",
      category: "Technical Team",
    },
    // Communication Team (4 members)
    {
      id: "13",
      name: data.team.communicationMember1?.name || "Communication Lead",
      role: data.team.communicationMember1?.role || "Communication Lead",
      image: data.team.communicationMember1?.image || "/placeholder.svg",
      category: "Communication Team",
    },
    {
      id: "14",
      name: data.team.communicationMember2?.name || "PR Manager",
      role: data.team.communicationMember2?.role || "PR Manager",
      image: data.team.communicationMember2?.image || "/placeholder.svg",
      category: "Communication Team",
    },
    {
      id: "15",
      name: data.team.communicationMember3?.name || "Event Coordinator",
      role: data.team.communicationMember3?.role || "Event Coordinator",
      image: data.team.communicationMember3?.image || "/placeholder.svg",
      category: "Communication Team",
    },
    {
      id: "16",
      name: data.team.communicationMember4?.name || "Outreach Manager",
      role: data.team.communicationMember4?.role || "Outreach Manager",
      image: data.team.communicationMember4?.image || "/placeholder.svg",
      category: "Communication Team",
    },
  ];

  const getTeamSize = (category) => {
    return category === "Core Team" ? 3 : 4;
  };

  const getCurrentSlideMembers = () => {
    // Get unique categories
    const categories = [...new Set(teamMembers.map(m => m.category))];
    const currentCategory = categories[currentIndex];
    
    // Filter members by current category
    return teamMembers.filter(m => m.category === currentCategory);
  };

  const totalSlides = [...new Set(teamMembers.map(m => m.category))].length;

  const getCurrentCategory = useCallback(() => {
    const categories = [...new Set(teamMembers.map(m => m.category))];
    return categories[currentIndex] || "Core Team";
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 700);
  }, [totalSlides, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 700);
  }, [totalSlides, isAnimating]);

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAnimating(false), 700);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleManualNavigation = (dir) => {
    setIsAutoPlaying(false);
    dir === "next" ? nextSlide() : prevSlide();
  };

  const currentMembers = getCurrentSlideMembers();

  return (
    <section id="team" className={styles.teamSection}>
      {/* Decorative elements */}
      <div className={styles.decorativeCircle1}></div>
      <div className={styles.decorativeCircle2}></div>
      <div className={styles.decorativeCircle3}></div>
      <div className={styles.decorativeCircle4}></div>
      <div className={styles.glowEffect1}></div>
      <div className={styles.glowEffect2}></div>

      {/* Floating Particles */}
      <div className={styles.particle} style={{ top: '15%', left: '10%', animationDelay: '0s' }}></div>
      <div className={styles.particle} style={{ top: '25%', left: '85%', animationDelay: '1s' }}></div>
      <div className={styles.particle} style={{ top: '45%', left: '5%', animationDelay: '2s' }}></div>
      <div className={styles.particle} style={{ top: '60%', left: '90%', animationDelay: '1.5s' }}></div>
      <div className={styles.particle} style={{ top: '75%', left: '15%', animationDelay: '0.5s' }}></div>
      <div className={styles.particle} style={{ top: '35%', left: '50%', animationDelay: '2.5s' }}></div>
      <div className={styles.particle} style={{ top: '80%', left: '70%', animationDelay: '3s' }}></div>
      <div className={styles.particle} style={{ top: '20%', left: '40%', animationDelay: '1.8s' }}></div>

      <div className={styles.teamContainer}>
        <div className={styles.teamGrid}>
          {/* Left Side - Dynamic Text */}
          <div className={styles.leftSection}>
            <div className={styles.leftContent}>
              <div className={styles.headerWrapper}>
                <h2 className={styles.mainTitle}>Meet Our Team</h2>
                <div className={styles.titleUnderline}></div>
              </div>

              <div className={styles.categoryWrapper}>
                <h3
                  key={currentIndex}
                  className={`${styles.categoryTitle} ${
                    direction === "next" ? styles.slideInRight : styles.slideInLeft
                  }`}
                >
                  {getCurrentCategory()}
                </h3>
              </div>

              <p className={styles.description}>
                Talented individuals working together to create exceptional
                experiences and drive innovation forward.
              </p>

              <div className={styles.controls}>
                <button
                  onClick={() => handleManualNavigation("prev")}
                  disabled={isAnimating}
                  className={styles.navButton}
                  aria-label="Previous team"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={() => handleManualNavigation("next")}
                  disabled={isAnimating}
                  className={styles.navButton}
                  aria-label="Next team"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>

                <div className={styles.dots}>
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      disabled={isAnimating}
                      className={`${styles.dot} ${
                        currentIndex === index ? styles.dotActive : ""
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - 2x2 Grid Cards */}
          <div className={styles.rightSection}>
            <div className={styles.cardsWrapper}>
              <div
                key={currentIndex}
                className={`${styles.cardsGrid} ${
                  currentMembers.length === 3 ? styles.threeMembers : 
                  currentMembers.length === 2 ? styles.twoMembers : 
                  styles.fourMembers
                } ${
                  direction === "next" ? styles.slideInRight : styles.slideInLeft
                }`}
              >
                {currentMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className={styles.card}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    <div className={styles.cardOverlay}></div>
                    <div className={styles.cardContent}>
                      <h4 className={styles.cardName}>{member.name}</h4>
                      <p className={styles.cardRole}>{member.role}</p>
                    </div>
                    <div className={styles.cardBorder}></div>
                  </div>
                ))}
              </div>
              <div className={styles.cardsGlow}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Pause button */}
      <div className={styles.pauseButton}>
        <button onClick={() => setIsAutoPlaying(!isAutoPlaying)}>
          {isAutoPlaying ? "Pause auto-scroll" : "Resume auto-scroll"}
        </button>
      </div>
    </section>
  );
};

export default Team;