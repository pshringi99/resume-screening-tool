# Test Data Documentation

This directory contains sample files to test the Resume Screening Tool across various scenarios.

## Directory Structure
All files are located in the `test_data/` folder.

## Scenarios

### 1. Frontend Developer Role
**Job Description**: `JD_Frontend.txt`
- A senior role requiring React, TypeScript, and Node.js experience.

**Resumes**:
- **Good Match**: `Resume_Frontend_Senior.txt`
    - Matches most requirements (React, TypeScript, 6 years exp).
    - Expected Score: High (>80%).
- **Average Match**: `Resume_Frontend_Junior.txt`
    - Has some relevant skills but lacks experience and depth.
    - Expected Score: Medium (50-70%).
- **Bad Match**: `Resume_Accountant.txt`
    - Completely irrelevant experience (Accounting).
    - Expected Score: Low (<30%).

### 2. Data Scientist Role
**Job Description**: `JD_DataScientist.txt`
- Requires Python, ML/DL, and Big Data experience.

**Resumes**:
- **Good Match**: `Resume_DataScientist.txt`
    - PhD with strong relevant experience.
    - Expected Score: High (>85%).

### 3. Edge Cases
- **Empty File**: `Resume_Empty.txt`
    - A text file with no content.
    - Test how the parser handles empty inputs.
- **Garbage Content**: `Resume_Garbage.txt`
    - Random characters and non-sense text.
    - Test how the LLM handles unintelligible input.
