import React, { useState } from "react";
import { generateClient } from "aws-amplify/api";

import {createCustomerDiscoveryModel} from "../../graphql/mutations";

const client = generateClient(); // AppSync client for Gen2
const CustomerDiscoveryComponent: React.FC = () => {
  interface FormState {
    email: string;
    additionalFeedback: string;
    balance: string;
    storeName: string;
    role: string;
    city: string;
    state: string;
    monthlyLossFromTheft: string;
    merchandiseTheftCategories: string[]; // Array of strings for checkbox selections
    monthlySecuritySpend: string;
    securityImprovements: string;
    roleChallenges: string;
    expensiveTheftTypes: string[]; // Array of strings for checkbox selections
    theftPreventionPlans: string[]; // Array of strings for checkbox selections
    theftPreventionTools: string[]; // Array of strings for checkbox selections
    theftPreventionEffectiveness: string;
    theftPatterns: string;
    staffTraining: string;
    strategyReviewFrequency: string;
    incidentHandling: string;
    theftImpact: string;
    additionalSupport: string;
    balanceSecurityWithExperience: string;
    collaborationsWithLawEnforcement: string;
    faceRecognitionEnhancement: string;
  }
  
  const [formState, setFormState] = useState<FormState>({
    email: "",
    additionalFeedback: "",
    balance: "",
    storeName: "",
    role: "",
    city: "",
    state: "",
    theftPreventionPlans: [],
    monthlyLossFromTheft: "",
    merchandiseTheftCategories: [],
    monthlySecuritySpend: "",
    securityImprovements: "",
    roleChallenges: "",
    expensiveTheftTypes: [], // Initialized as an empty array
    theftPreventionTools: [], // Initialized as an empty array
    theftPreventionEffectiveness: "",
    theftPatterns: "",
    staffTraining: "",
    strategyReviewFrequency: "",
    incidentHandling: "",
    theftImpact: "",
    additionalSupport: "",
    balanceSecurityWithExperience: "",
    collaborationsWithLawEnforcement: "",
    faceRecognitionEnhancement: "",
  });
  
  
  const [submitted, setSubmitted] = useState(false);
  const [loading] = useState(false);
  const [errorMessage] = useState("");

  const setInput = (key: string, value: string | string[]) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const input = {
        email: formState.email,
        additionalFeedback: formState.additionalFeedback,
        balance: formState.balance,
        storeName: formState.storeName,
        role: formState.role,
        city: formState.city,
        state: formState.state,
        monthlyLossFromTheft: formState.monthlyLossFromTheft,
        merchandiseTheftCategories: formState.merchandiseTheftCategories,
        monthlySecuritySpend: formState.monthlySecuritySpend,
        securityImprovements: formState.securityImprovements,
        roleChallenges: formState.roleChallenges,
        expensiveTheftTypes: formState.expensiveTheftTypes,
        theftPreventionPlans: formState.theftPreventionPlans,
        theftPreventionTools: formState.theftPreventionTools,
        theftPreventionEffectiveness: formState.theftPreventionEffectiveness,
        theftPatterns: formState.theftPatterns,
        staffTraining: formState.staffTraining,
        strategyReviewFrequency: formState.strategyReviewFrequency,
        incidentHandling: formState.incidentHandling,
        theftImpact: formState.theftImpact,
        additionalSupport: formState.additionalSupport,
        balanceSecurityWithExperience: formState.balanceSecurityWithExperience,
        collaborationsWithLawEnforcement: formState.collaborationsWithLawEnforcement,
        faceRecognitionEnhancement: formState.faceRecognitionEnhancement,
      };
    
      console.log("Submitting input:", JSON.stringify(input, null, 2));

      // console.log("Submitting input:", input);

      const result = await client.graphql({
        query: createCustomerDiscoveryModel  ,
        variables: { input },
      });
      
      console.log('Mutation result:', result);
     

      setFormState({
        email: "",
        additionalFeedback: "",
        balance: "",
        theftPreventionPlans: [],
        storeName: "",
        role: "",
        city: "",
        state: "",
        monthlyLossFromTheft: "",
        merchandiseTheftCategories: [],
        monthlySecuritySpend: "",
        securityImprovements: "",
        roleChallenges: "",
        expensiveTheftTypes: [], // Already an array
        theftPreventionTools: [],
        theftPreventionEffectiveness: "",
        theftPatterns: "",
        staffTraining: "",
        strategyReviewFrequency: "",
        incidentHandling: "",
        theftImpact: "",
        additionalSupport: "",
        balanceSecurityWithExperience: "",
        collaborationsWithLawEnforcement: "",
        faceRecognitionEnhancement: "",
      });
      
      setSubmitted(true);
    } catch (error: any) {
      console.error('Error submitting form:', error); // Log the full error
      if (error.response) {
        console.error('Error response:', error.response);
      }
      if (error.message) {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Customer Discovery for Retail or Security Managers</h2>
      {submitted ? (
        <div className="alert alert-success">Thank you for your feedback!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className="mb-3">
          <label htmlFor="email">Enter your email. Your email will not be given to others or otherwise misused. It is used as the primary key to anaylze responses</label>
            <input
              id="email"
              type="email"
              value={formState.email}
              onChange={(e) => setInput('email', e.target.value)}
              placeholder="Enter email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
          <label htmlFor="role">What is your role and responsibility at your company?</label>
             <input
    id="role"
      type="text"
    value={formState.role}
    onChange={(e) => setInput("role", e.target.value)}
    placeholder="Enter your role"
    className="form-control"
    required
  />
</div>
          <div className="mb-3">
  <label htmlFor="storeName">Name of the Store</label>
  <input
    id="storeName"
    type="text"
    value={formState.storeName}
    onChange={(e) => setInput("storeName", e.target.value)}
    placeholder="Enter store name"
    className="form-control"
    required
  />
</div>



<div className="mb-3">
  <label htmlFor="city">Retail Store Location</label>
  <input
    id="city"
    type="text"
    value={formState.city}
    onChange={(e) => setInput("city", e.target.value)}
    placeholder="Enter city"
    className="form-control"
    required
  />
  <input
    id="state"
    type="text"
    value={formState.state}
    onChange={(e) => setInput("state", e.target.value)}
    placeholder="Enter state"
    className="form-control mt-2"
    required
  />
</div>

<div className="mb-3">
    <label>What expensive types of theft are most prevalent in your store?</label>
    <div className="form-check">
      <input
        id="shoplifting"
        type="checkbox"
        className="form-check-input"
        checked={formState.expensiveTheftTypes.includes("Shoplifting")}
        onChange={(e) =>
          setInput(
            "expensiveTheftTypes",
            e.target.checked
              ? [...formState.expensiveTheftTypes, "Shoplifting"]
              : formState.expensiveTheftTypes.filter((type) => type !== "Shoplifting")
          )
        }
      />
      <label htmlFor="shoplifting" className="form-check-label">Shoplifting</label>
    </div>
    <div className="form-check">
      <input
        id="employeeTheft"
        type="checkbox"
        className="form-check-input"
        checked={formState.expensiveTheftTypes.includes("Employee Theft")}
        onChange={(e) =>
          setInput(
            "expensiveTheftTypes",
            e.target.checked
              ? [...formState.expensiveTheftTypes, "Employee Theft"]
              : formState.expensiveTheftTypes.filter((type) => type !== "Employee Theft")
          )
        }
      />
      <label htmlFor="employeeTheft" className="form-check-label">Employee Theft</label>
    </div>
    <div className="form-check">
      <input
        id="organizedRetailTheft"
        type="checkbox"
        className="form-check-input"
        checked={formState.expensiveTheftTypes.includes("Organized Retail Theft")}
        onChange={(e) =>
          setInput(
            "expensiveTheftTypes",
            e.target.checked
              ? [...formState.expensiveTheftTypes, "Organized Retail Theft"]
              : formState.expensiveTheftTypes.filter((type) => type !== "Organized Retail Theft")
          )
        }
      />
      <label htmlFor="organizedRetailTheft" className="form-check-label">
        Organized Retail Theft
      </label>
    </div>
  </div>

  <div className="mb-3">
  <label>What theft prevention plans do you have in your store?</label>
  <div className="form-check">
    <input
      id="cctv"
      type="checkbox"
      className="form-check-input"
      checked={formState.theftPreventionPlans.includes("CCTV Surveillance")}
      onChange={(e) =>
        setInput(
          "theftPreventionPlans",
          e.target.checked
            ? [...formState.theftPreventionPlans, "CCTV Surveillance"]
            : formState.theftPreventionPlans.filter((plan) => plan !== "CCTV Surveillance")
        )
      }
    />
    <label htmlFor="cctv" className="form-check-label">
      CCTV Surveillance
    </label>
  </div>
  <div className="form-check">
    <input
      id="easTags"
      type="checkbox"
      className="form-check-input"
      checked={formState.theftPreventionPlans.includes("EAS Tags")}
      onChange={(e) =>
        setInput(
          "theftPreventionPlans",
          e.target.checked
            ? [...formState.theftPreventionPlans, "EAS Tags"]
            : formState.theftPreventionPlans.filter((plan) => plan !== "EAS Tags")
        )
      }
    />
    <label htmlFor="easTags" className="form-check-label">
      EAS Tags
    </label>
  </div>
  <div className="form-check">
    <input
      id="employeeTraining"
      type="checkbox"
      className="form-check-input"
      checked={formState.theftPreventionPlans.includes("Employee Training")}
      onChange={(e) =>
        setInput(
          "theftPreventionPlans",
          e.target.checked
            ? [...formState.theftPreventionPlans, "Employee Training"]
            : formState.theftPreventionPlans.filter((plan) => plan !== "Employee Training")
        )
      }
    />
    <label htmlFor="employeeTraining" className="form-check-label">
      Employee Training
    </label>
  </div>
  <div className="form-check">
    <input
      id="storeLayout"
      type="checkbox"
      className="form-check-input"
      checked={formState.theftPreventionPlans.includes("Store Layout Design")}
      onChange={(e) =>
        setInput(
          "theftPreventionPlans",
          e.target.checked
            ? [...formState.theftPreventionPlans, "Store Layout Design"]
            : formState.theftPreventionPlans.filter((plan) => plan !== "Store Layout Design")
        )
      }
    />
    <label htmlFor="storeLayout" className="form-check-label">
      Store Layout Design
    </label>
  </div>
  <div className="form-check">
    <input
      id="lossPrevention"
      type="checkbox"
      className="form-check-input"
      checked={formState.theftPreventionPlans.includes("Loss Prevention Personnel")}
      onChange={(e) =>
        setInput(
          "theftPreventionPlans",
          e.target.checked
            ? [...formState.theftPreventionPlans, "Loss Prevention Personnel"]
            : formState.theftPreventionPlans.filter((plan) => plan !== "Loss Prevention Personnel")
        )
      }
    />
    <label htmlFor="lossPrevention" className="form-check-label">
      Loss Prevention Personnel
    </label>
  </div>
</div>
<div className="mb-3">
  <label htmlFor="monthlyLossFromTheft">How much do you think your store loses monthly from theft?</label>
  <input
    id="monthlyLossFromTheft"
    type="text"
    value={formState.monthlyLossFromTheft}
    onChange={(e) => setInput("monthlyLossFromTheft", e.target.value)}
    placeholder="Enter estimated loss"
    className="form-control"
  />
</div>

<div className="mb-3">
  <label>What merchandise categories experience the most theft?</label>
  <div className="form-check">
    <input
      id="apparel"
      type="checkbox"
      className="form-check-input"
      checked={formState.merchandiseTheftCategories.includes("Apparel and Accessories")}
      onChange={(e) =>
        setInput(
          "merchandiseTheftCategories",
          e.target.checked
            ? [...formState.merchandiseTheftCategories, "Apparel and Accessories"]
            : formState.merchandiseTheftCategories.filter((category) => category !== "Apparel and Accessories")
        )
      }
    />
    <label htmlFor="apparel" className="form-check-label">
      Apparel and Accessories
    </label>
  </div>
  <div className="form-check">
    <input
      id="electronics"
      type="checkbox"
      className="form-check-input"
      checked={formState.merchandiseTheftCategories.includes("Electronics")}
      onChange={(e) =>
        setInput(
          "merchandiseTheftCategories",
          e.target.checked
            ? [...formState.merchandiseTheftCategories, "Electronics"]
            : formState.merchandiseTheftCategories.filter((category) => category !== "Electronics")
        )
      }
    />
    <label htmlFor="electronics" className="form-check-label">
      Electronics
    </label>
  </div>
  <div className="form-check">
    <input
      id="healthBeauty"
      type="checkbox"
      className="form-check-input"
      checked={formState.merchandiseTheftCategories.includes("Health and Beauty Products")}
      onChange={(e) =>
        setInput(
          "merchandiseTheftCategories",
          e.target.checked
            ? [...formState.merchandiseTheftCategories, "Health and Beauty Products"]
            : formState.merchandiseTheftCategories.filter((category) => category !== "Health and Beauty Products")
        )
      }
    />
    <label htmlFor="healthBeauty" className="form-check-label">
      Health and Beauty Products
    </label>
  </div>
  <div className="form-check">
    <input
      id="alcoholTobacco"
      type="checkbox"
      className="form-check-input"
      checked={formState.merchandiseTheftCategories.includes("Alcohol and Tobacco")}
      onChange={(e) =>
        setInput(
          "merchandiseTheftCategories",
          e.target.checked
            ? [...formState.merchandiseTheftCategories, "Alcohol and Tobacco"]
            : formState.merchandiseTheftCategories.filter((category) => category !== "Alcohol and Tobacco")
        )
      }
    />
    <label htmlFor="alcoholTobacco" className="form-check-label">
      Alcohol and Tobacco
    </label>
  </div>
  <div className="form-check">
    <input
      id="groceries"
      type="checkbox"
      className="form-check-input"
      checked={formState.merchandiseTheftCategories.includes("Groceries")}
      onChange={(e) =>
        setInput(
          "merchandiseTheftCategories",
          e.target.checked
            ? [...formState.merchandiseTheftCategories, "Groceries"]
            : formState.merchandiseTheftCategories.filter((category) => category !== "Groceries")
        )
      }
    />
    <label htmlFor="groceries" className="form-check-label">
      Groceries
    </label>
  </div>
</div>


<div className="mb-3">
  <label htmlFor="monthlySecuritySpend">How much does your store spend on security each month?</label>
  <input
    id="monthlySecuritySpend"
    type="text"
    value={formState.monthlySecuritySpend}
    onChange={(e) => setInput("monthlySecuritySpend", e.target.value)}
    placeholder="Enter monthly spend"
    className="form-control"
  />
</div>

<div className="mb-3">
  <label htmlFor="securityImprovements">Is there anything you would do differently to improve your store's security?</label>
  <textarea
    id="securityImprovements"
    rows={3}
    value={formState.securityImprovements}
    onChange={(e) => setInput("securityImprovements", e.target.value)}
    placeholder="Enter ideas for improvement"
    className="form-control"
  />
</div>

<div className="mb-3">
  <label htmlFor="roleChallenges">What are some challenges you face in your role?</label>
  <textarea
    id="roleChallenges"
    rows={3}
    value={formState.roleChallenges}
    onChange={(e) => setInput("roleChallenges", e.target.value)}
    placeholder="Enter challenges"
    className="form-control"
  />
</div>



<div className="mb-3">
  <label htmlFor="theftPreventionTools">What technologies or tools are you currently using for theft prevention?</label>
  <textarea
    id="theftPreventionTools"
    rows={3}
    value={formState.theftPreventionTools}
    onChange={(e) => setInput("theftPreventionTools", e.target.value)}
    placeholder="Enter technologies/tools used"
    className="form-control"
  />
</div>

<div className="mb-3">
  <label htmlFor="theftPatterns">Have you noticed any patterns or trends in theft incidents?</label>
  <textarea
    id="theftPatterns"
    rows={3}
    value={formState.theftPatterns}
    onChange={(e) => setInput("theftPatterns", e.target.value)}
    placeholder="Enter theft patterns or trends"
    className="form-control"
  />
</div>

<div className="mb-3">
  <label htmlFor="faceRecognitionEnhancement">21. How could face recognition technology enhance your theft prevention measures?</label>
  <textarea
    id="faceRecognitionEnhancement"
    rows={3}
    value={formState.faceRecognitionEnhancement}
    onChange={(e) => setInput("faceRecognitionEnhancement", e.target.value)}
    placeholder="Enter feedback on face recognition"
    className="form-control"
  />
</div>

          <div className="mb-3">
            <label htmlFor="additionalFeedback">Share any other feedback here.</label>
            <input
              id="additionalFeedback"
              type="text"
              value={formState.additionalFeedback}
              onChange={(e) => setInput("additionalFeedback", e.target.value)}
              placeholder="Enter feedback"
              className="form-control"
              
            />
          </div>
          <div className="mb-3">
            <label htmlFor="balance">Balance</label>
            <textarea
              id="balance"
              rows={3}
              value={formState.balance}
              onChange={(e) => setInput("balance", e.target.value)}
              placeholder="Enter balance"
              className="form-control"
            
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: "darkblue", color: "white" }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CustomerDiscoveryComponent;
