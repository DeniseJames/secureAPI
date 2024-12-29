import React, { useState } from "react";
import { generateClient } from "aws-amplify/api";
import {createCustomerDiscoveryModel} from "../../graphql/mutations";

const client = generateClient(); // AppSync client for Gen2
const CustomerDiscoveryComponent: React.FC = () => {
  interface FormState {
    email: string;
    additionalFeedback: string;
    storeName: string;
    role: string;
    city: string;
    state: string;
    monthlyLossFromTheft: number;
    merchandiseTheftCategories: string[];
    monthlySecuritySpend: number;
    securityImprovements: string;
    roleChallenges: string;
    expensiveTheftTypes: string[];
    theftPreventionPlans: string[];
    theftPreventionTools: string[];
    theftPatterns: string;
    staffTraining: string[];
    faceRecognitionEnhancement: string;
  }
  
  const [formState, setFormState] = useState<FormState>({
    email: "",
    monthlyLossFromTheft: 0,
    additionalFeedback: "",
    city: "",
    expensiveTheftTypes: [],
    faceRecognitionEnhancement: "",
    merchandiseTheftCategories: [],
    monthlySecuritySpend: 0,
    role: "",
    roleChallenges: "",
    securityImprovements: "",
    staffTraining: [],
    state: "",
    storeName: "",
    theftPatterns: "",
    theftPreventionPlans: [],
    theftPreventionTools: [],
  });
  
  
  const [submitted, setSubmitted] = useState(false);
  const [loading] = useState(false);
  const [errorMessage] = useState("");

  const setInput = (key: string, value: string | string[] | number) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const input = {
        email: formState.email,
      additionalFeedback: formState.additionalFeedback,
      storeName: formState.storeName,
      role: formState.role,
      city: formState.city,
      state: formState.state,
      monthlyLossFromTheft: formState.monthlyLossFromTheft, // No parsing needed
      merchandiseTheftCategories: formState.merchandiseTheftCategories,
      monthlySecuritySpend: formState.monthlySecuritySpend, // No parsing needed
      securityImprovements: formState.securityImprovements,
      roleChallenges: formState.roleChallenges,
      expensiveTheftTypes: formState.expensiveTheftTypes,
      theftPreventionPlans: formState.theftPreventionPlans,
      theftPreventionTools: formState.theftPreventionTools,
      theftPatterns: formState.theftPatterns,
      staffTraining: formState.staffTraining,
      faceRecognitionEnhancement: formState.faceRecognitionEnhancement

      };
    
      console.log("Submitting input:", JSON.stringify(input, null, 2));

      console.log("Type of monthlyLossFromTheft:", typeof input.monthlyLossFromTheft);
      console.log("Type of monthlySecuritySpend:", typeof input.monthlySecuritySpend);

      const result = await client.graphql({
        query: createCustomerDiscoveryModel  ,
        variables: { input },
      });
      
      console.log('Mutation result:', result);
     

      setFormState({
        email: "",
        additionalFeedback: "",
        theftPreventionPlans: [],
        storeName: "",
        role: "",
        city: "",
        state: "",
        monthlyLossFromTheft: 0,
        merchandiseTheftCategories: [],
        monthlySecuritySpend: 0,
        securityImprovements: "",
        roleChallenges: "",
        expensiveTheftTypes: [], // Already an array
        theftPreventionTools: [],
        theftPatterns: "",
        staffTraining: [],
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
          <div className="mb-3 text-start">
          <label htmlFor="email" className="form-label mt-3 mb-3">Enter your email. Your email will not be given to others or otherwise misused. It is used as the primary key to anaylze responses</label>
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
          <div className="mb-3 text-start ">
          <label htmlFor="role" className="form-label mt-3 mb-3">What is your role and responsibility at your company?</label>
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
          <div className="mb-3 text-start">
  <label htmlFor="storeName" className="form-label mt-3 mb-3">Name of the Store</label>
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



<div className="mb-3 text-start">
  <label htmlFor="city" className="form-label mt-3 mb-3">Retail Store Location</label>
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

<div className="mb-3 text-start">
    <label className="form-label mt-3 mb-3">What expensive types of theft are most prevalent in your store?</label>
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
    <div className="form-check">
            <input
              id="othertheft"
              type="checkbox"
              className="form-check-input"
              checked={formState.staffTraining.includes("Other Theft")}
              onChange={(e) =>
                setInput(
                  "staffTraining",
                  e.target.checked
                    ? [...formState.staffTraining, "Other Theft"]
                    : formState.staffTraining.filter((plan) => plan !== "Other Theft")
                )
              }
            />
            <label htmlFor="othertheft" className="form-check-label">
              Other Theft
            </label>
          </div>
  </div>

  <div className="mb-3 text-start">
  <label className="form-label mt-3 mb-3">What theft prevention plans do you have in your store?</label>
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
  <div className="form-check">
            <input
              id="otherplans"
              type="checkbox"
              className="form-check-input"
              checked={formState.staffTraining.includes("Other Plan(s)")}
              onChange={(e) =>
                setInput(
                  "staffTraining",
                  e.target.checked
                    ? [...formState.staffTraining, "Other Plan(s)"]
                    : formState.staffTraining.filter((plan) => plan !== "Other Plan(s)")
                )
              }
            />
            <label htmlFor="otherplans" className="form-check-label">
              Other Plan(s)
            </label>
          </div>
</div>
<div className="mb-3 text-start">
  <label htmlFor="monthlyLossTheft" className="form-label mt-3 mb-3">How much do you think your store loses monthly from theft?</label>
  <input
  id="monthlyLossTheft"
  type="number"
  value={formState.monthlyLossFromTheft}
  onChange={(e) => setInput("monthlyLossFromTheft", e.target.value)}
  placeholder="Enter estimated loss"
  className="form-control"
/>

</div>

<div className="mb-3 text-start">
  <label className="form-label mt-3 mb-3">What merchandise categories experience the most theft?</label>
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
   <div className="form-check">
            <input
              id="otherdep"
              type="checkbox"
              className="form-check-input"
              checked={formState.staffTraining.includes("Other Department")}
              onChange={(e) =>
                setInput(
                  "staffTraining",
                  e.target.checked
                    ? [...formState.staffTraining, "Other Department"]
                    : formState.staffTraining.filter((plan) => plan !== "Other Department")
                )
              }
            />
            <label htmlFor="otherdep" className="form-check-label">
              Other Department
            </label>
          </div>
</div>


<div className="mb-3 text-start">
  <label htmlFor="monthlySecuritySpend" className="form-label mt-3 mb-3">How much does your store spend on security each month?</label>
  <input
    id="monthlySecuritySpend"
    type="number"
    value={formState.monthlySecuritySpend}
    onChange={(e) => setInput("monthlySecuritySpend", parseFloat(e.target.value))}
    placeholder="Enter monthly spend"
    className="form-control"
  />
</div>

<div className="mb-3 text-start">
  <label htmlFor="securityImprovements" className="form-label mt-3 mb-3">Is there anything you would do differently to improve your store's security?</label>
  <textarea
    id="securityImprovements"
    rows={5}
    value={formState.securityImprovements}
    onChange={(e) => setInput("securityImprovements", e.target.value)}
    placeholder="Enter ideas for improvement"
    className="form-control"
  />
</div>

<div className="mb-3 text-start">
          <label className="form-label mt-3 mb-3">How do you train your staff to prevent and detect theft?</label>
          <div className="form-check">
            <input
              id="greetCustomers"
              type="checkbox"
              className="form-check-input"
              checked={formState.staffTraining.includes("Greet Customers")}
              onChange={(e) =>
                setInput(
                  "staffTraining",
                  e.target.checked
                    ? [...formState.staffTraining, "Greet Customers"]
                    : formState.staffTraining.filter((plan) => plan !== "Greet Customers")
                )
              }
            />
            <label htmlFor="greetCustomers" className="form-check-label">
              Greet Customers
            </label>
          </div>
          <div className="form-check">
            <input
              id="askToHelp"
              type="checkbox"
              className="form-check-input"
              checked={formState.staffTraining.includes("Ask to Help Customers")}
              onChange={(e) =>
                setInput(
                  "staffTraining",
                  e.target.checked
                    ? [...formState.staffTraining, "Ask to Help Customers"]
                    : formState.staffTraining.filter((plan) => plan !== "Ask to Help Customers")
                )
              }
            />
            <label htmlFor="askToHelp" className="form-check-label">
              Ask to Help Customers
            </label>
          </div>
          <div className="form-check">
            <input
              id="staffWearingCameras"
              type="checkbox"
              className="form-check-input"
              checked={formState.staffTraining.includes("Staff Wearing Cameras to Record Theft")}
              onChange={(e) =>
                setInput(
                  "staffTraining",
                  e.target.checked
                    ? [...formState.staffTraining, "Staff Wearing Cameras to Record Theft"]
                    : formState.staffTraining.filter((plan) => plan !== "Staff Wearing Cameras to Record Theft")
                )
              }
            />
            <label htmlFor="staffWearingCameras" className="form-check-label">
              Staff Wearing Cameras to Record Theft
            </label>
          </div>
          <div className="form-check">
            <input
              id="reportTheft"
              type="checkbox"
              className="form-check-input"
              checked={formState.staffTraining.includes("Report Theft to Management")}
              onChange={(e) =>
                setInput(
                  "staffTraining",
                  e.target.checked
                    ? [...formState.staffTraining, "Report Theft to Management"]
                    : formState.staffTraining.filter((plan) => plan !== "Report Theft to Management")
                )
              }
            />
            <label htmlFor="reportTheft" className="form-check-label">
              Report Theft to Management
            </label>
          </div>
          <div className="form-check">
            <input
              id="other"
              type="checkbox"
              className="form-check-input"
              checked={formState.staffTraining.includes("Other")}
              onChange={(e) =>
                setInput(
                  "staffTraining",
                  e.target.checked
                    ? [...formState.staffTraining, "Other"]
                    : formState.staffTraining.filter((plan) => plan !== "Other")
                )
              }
            />
            <label htmlFor="other" className="form-check-label">
              Other
            </label>
          </div>
        </div>

<div className="mb-3 text-start">
  <label htmlFor="roleChallenges" className="form-label mt-3 mb-3">What are some challenges you face in your role?</label>
  <textarea
    id="roleChallenges"
    rows={5}
    value={formState.roleChallenges}
    onChange={(e) => setInput("roleChallenges", e.target.value)}
    placeholder="Enter challenges"
    className="form-control"
  />
</div>

<div className="mb-3 text-start">
  <label htmlFor="theftPreventionTools" className="form-label mt-3 mb-3">What technologies or tools are you currently using for theft prevention?</label>
  <textarea
    id="theftPreventionTools"
    rows={5}
    value={formState.theftPreventionTools}
    onChange={(e) => setInput("theftPreventionTools", e.target.value)}
    placeholder="Enter technologies/tools used"
    className="form-control"
  />
</div>

<div className="mb-3 text-start">
  <label htmlFor="theftPatterns" className="form-label mt-3 mb-3">Have you noticed any patterns or trends in theft incidents?</label>
  <textarea
    id="theftPatterns"
    rows={5}
    value={formState.theftPatterns}
    onChange={(e) => setInput("theftPatterns", e.target.value)}
    placeholder="Enter theft patterns or trends"
    className="form-control"
  />
</div>

<div className="mb-3 text-start">
  <label htmlFor="faceRecognitionEnhancement" className="form-label mt-3 mb-3">How could face recognition technology enhance your theft prevention measures?</label>
  <textarea
    id="faceRecognitionEnhancement"
    rows={5}
    value={formState.faceRecognitionEnhancement}
    onChange={(e) => setInput("faceRecognitionEnhancement", e.target.value)}
    placeholder="Enter feedback on face recognition"
    className="form-control"
  />
</div>

          <div className="mb-3 text-start">
            <label htmlFor="additionalFeedback">Share any other feedback here.</label>
            <textarea
              id="additionalFeedback"
              rows={5}
              value={formState.additionalFeedback}
              onChange={(e) => setInput("additionalFeedback", e.target.value)}
              placeholder="Enter feedback"
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
