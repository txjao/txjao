import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";
import { enLettering, enLetteringTitle, ptLettering, ptLetteringTitle } from "../consts/Languange";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useState } from "react";

const Container = styled.div`
    .display {
        display: flex;
        flex-direction: column;
    }

    h1,h2 {
        background: -webkit-linear-gradient(180deg, rgba(255, 240, 0, 1) 0%, rgba(0, 181, 255, 1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 40px;
    }

    .wrapper-lettering {
        height: auto;
        width: auto;
    }

    .index-module_type__E-SaG {
        font-size: 40px;
        display: inline-block;
        background: -webkit-linear-gradient(180deg, rgba(255, 240, 0, 1) 0%, rgba(0, 181, 255, 1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: Inter;
        font-weight: 700;
    }

    @media (max-width: 1440px) {
        .index-module_type__E-SaG {
            font-size: 32px;
        }
        h1,h2 {
            font-size: 32px;
        }
    }

    @media (max-width: 1024px) {
        .index-module_type__E-SaG {
            font-size: 24px;
        }
        h1,h2 {
            font-size: 24px;
        }
        .wrapper-lettering {
            height: 48px;
        }
    }

    @media (max-width: 450px) {
        .wrapper-lettering {
            height: 110px;
            width: 220px;
        }
        .index-module_type__E-SaG {
            font-size: 20px;
        }
        h1,h2 {
            font-size: 20px;
        }
    }
    @media (max-width: 400px) {
        .wrapper-lettering {
            height: 110px;
            width: 200px;
        }
    }
    @media (max-width: 325px) {
        .wrapper-lettering {
            height: 110px;
            width: 128px;
        }
    }
`;

export function Lettering() {
  const { language } = useLanguage()
  const [lettering, setLettering] = useState(() => language === 'EN' ? enLettering : ptLettering)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const newLettering = language === 'EN' ? enLettering : ptLettering
    setLettering(newLettering)
    setKey(prev => prev + 1)
  }, [language])

  return (
    <Container>
      <div style={{ display: "inline-flex" }}>
        <h1>{language === 'EN' ? enLetteringTitle : ptLetteringTitle}</h1><p>👋</p>
      </div>
      <div className="wrapper-lettering">
        <TypeAnimation
          key={key}
          sequence={lettering}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </div>
    </Container>
  );
}
