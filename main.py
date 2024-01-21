import numpy as np
from scipy import integrate

# @@Dara the names of some of these things is probadly off

class EllipticalArchLengthCalculator:
  def __init__(self, diameter_1, diameter_2):
    self.diameter_1 = diameter_1
    self.diameter_2 = diameter_2
    self.result = None;
    self.error = None;

  # defines a function for getting the upper bound of the integral
  def getUpperBound(self, deg):
    deg_in_rad =  np.radians(deg)
    return np.arctan(self.diameter_1*np.tan(deg_in_rad)/self.diameter_2)

  def integrand(self, t):
    return np.sqrt((self.diameter_1**2)*np.sin(t)**2 + (self.diameter_2**2)*np.cos(t)**2)

  # returns the calculation given a singular target temporal rotation in degrees
  def getCalculationForTargetRotationInDegrees(self, deg):
    result, error = integrate.quad(self.integrand, 0, self.getUpperBound(deg))
    self.result = result
    self.error = error
    return result

  def getAllCalculationsForTargetDegreeRotationRange(self, lowerBound, upperBound, step = 1):
    if upperBound < lowerBound:
      raise Exception(f"lower bound {lowerBound} is higher than the upperBound {upperBound}")
      return;
    if step < 1:
      raise Exception(f"step {step} is lower than 1")
      return;
    caculation = [self.getCalculationForTargetRotationInDegrees(deg) for deg in range(lowerBound, upperBound, step)]
    self.result = caculation
    return caculation

def getCalculationsForTargetFemoralRotationRange(diameter_1, diameter_2):
  calc = EllipticalArchLengthCalculator(diameter_1,diameter_2)
  target_low_bound = 5
  target_upper_bound = 90
  step = 5
  return calc.getAllCalculationsForTargetDegreeRotationRange(target_low_bound,target_upper_bound, step)

  # Example 1 with diameter_1 = 3.05, diameter_2 = 2.23

results = getCalculationsForTargetFemoralRotationRange(3.05, 2.23)

current_femoral_degree_target = 5
for result in results:
  print(f"{current_femoral_degree_target}°: {result}")
  current_femoral_degree_target += 5