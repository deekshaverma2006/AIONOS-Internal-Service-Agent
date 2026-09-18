function decideAction(request, knowledge) {
  const text = request.toLowerCase().trim();

  // =========================================================
  // REQ-08 / SECURITY INCIDENTS
  // =========================================================
  if (
    text.includes("phishing") ||
    text.includes("malware") ||
    text.includes("unauthorized access") ||
    text.includes("suspicious email") ||
    text.includes("security incident")
  ) {
    return {
      action: "ESCALATE",
      reason:
        "Security-related incidents require immediate Security team handling.",
      priority: "HIGH",
    };
  }

  // =========================================================
  // REQ-10 / ADMIN ACCESS
  // =========================================================
  if (
    (text.includes("admin") || text.includes("administrator")) &&
    (
      text.includes("access") ||
      text.includes("permission") ||
      text.includes("privilege")
    )
  ) {
    return {
      action: "ESCALATE",
      reason:
        "Administrative access requires business justification and appropriate approval.",
      priority: "HIGH",
    };
  }

  // =========================================================
  // REQ-04 / NON-CATALOG SOFTWARE
  // =========================================================
  if (
    text.includes("non-catalog") ||
    text.includes("non catalog") ||
    (
      text.includes("software") &&
      text.includes("install") &&
      (
        text.includes("not in") ||
        text.includes("catalog")
      )
    )
  ) {
    return {
      action: "ESCALATE",
      reason:
        "Non-catalog software requires IT Security review before installation.",
      priority: "MEDIUM",
    };
  }

  // =========================================================
  // REQ-14 / BROWSER EXTENSION
  // =========================================================
  if (
    text.includes("browser extension") ||
    text.includes("chrome extension") ||
    text.includes("firefox extension") ||
    text.includes("edge extension")
  ) {
    return {
      action: "ESCALATE",
      reason:
        "Browser extensions must be checked against the approved software catalog and security policy.",
      priority: "MEDIUM",
    };
  }

  // =========================================================
  // REQ-11 / CONTRACTOR VPN
  // =========================================================
  if (
    text.includes("contractor") &&
    text.includes("vpn")
  ) {
    return {
      action: "ESCALATE",
      reason:
        "Contractor VPN access requires manager approval through the access request process.",
      priority: "MEDIUM",
    };
  }

  // =========================================================
  // REQ-05 / VPN CREDENTIAL EXPIRED
  // =========================================================
  if (
    text.includes("vpn") &&
    (
      text.includes("expired") ||
      text.includes("credential") ||
      text.includes("renew")
    )
  ) {
    return {
      action: "RESOLVE",
      reason:
        "VPN credentials expire every 90 days and can be renewed by the employee according to the VPN access policy.",
      priority: "MEDIUM",
    };
  }

  // =========================================================
  // REQ-03 / ACCOUNT LOCKED
  // =========================================================
  if (
    text.includes("locked out") ||
    text.includes("account locked") ||
    text.includes("account is locked") ||
    (text.includes("locked") && text.includes("account")) ||
    text.includes("failed login") ||
    text.includes("failed login attempts") ||
    text.includes("6 attempts")
  ) {
    return {
      action: "RESOLVE",
      reason:
        "The account lockout process applies and the account can be unlocked through IT support.",
      priority: "MEDIUM",
    };
  }

  // =========================================================
  // PASSWORD RESET
  // =========================================================
  if (
    text.includes("password") &&
    (
      text.includes("reset") ||
      text.includes("forgot") ||
      text.includes("failed") ||
      text.includes("expired")
    )
  ) {
    return {
      action: "RESOLVE",
      reason:
        "The password reset or self-service account recovery process applies.",
      priority: "MEDIUM",
    };
  }

  // =========================================================
  // REQ-02 / GUEST WI-FI
  // =========================================================
  if (
    (text.includes("guest") || text.includes("visitor")) &&
    (
      text.includes("wi-fi") ||
      text.includes("wifi") ||
      text.includes("wireless")
    )
  ) {
    return {
      action: "RESOLVE",
      reason:
        "Guest Wi-Fi credentials can be generated through the approved front-desk self-service process.",
      priority: "LOW",
    };
  }

  // =========================================================
  // REQ-01 / DEAD LAPTOP / HARDWARE FAILURE
  // =========================================================
  if (
    text.includes("laptop") &&
    (
      text.includes("won't turn on") ||
      text.includes("wont turn on") ||
      text.includes("completely dead") ||
      text.includes("doesn't turn on") ||
      text.includes("doesnt turn on") ||
      text.includes("not turning on") ||
      text.includes("dead")
    )
  ) {
    return {
      action: "CREATE_TICKET",
      reason:
        "The laptop appears to have a hardware failure and requires hardware support/replacement assessment.",
      priority: "HIGH",
    };
  }

  // =========================================================
  // REQ-13 / FLICKERING LAPTOP
  // =========================================================
  if (
    text.includes("laptop") &&
    (
      text.includes("flicker") ||
      text.includes("flickering") ||
      text.includes("screen flicker") ||
      text.includes("display issue")
    )
  ) {
    return {
      action: "CREATE_TICKET",
      reason:
        "The laptop requires hardware troubleshooting; the available policy does not justify automatic replacement.",
      priority: "MEDIUM",
    };
  }

  // =========================================================
  // REQ-06 / PRINTER
  // =========================================================
  if (
    text.includes("printer") ||
    text.includes("printer jam") ||
    text.includes("paper jam")
  ) {
    return {
      action: "CREATE_TICKET",
      reason:
        "Printer troubleshooting requires the relevant printer or asset details if the issue persists.",
      priority: "LOW",
    };
  }

  // =========================================================
  // REQ-07 / WORK FROM HOME / HOME OFFICE
  // =========================================================
  if (
    text.includes("work from home") ||
    text.includes("working from home") ||
    text.includes("home office") ||
    text.includes("home-office") ||
    text.includes("monitor") ||
    text.includes("home equipment")
  ) {
    return {
      action: "CREATE_TICKET",
      reason:
        "Home-office equipment requests require manager approval and Finance processing.",
      priority: "MEDIUM",
    };
  }

  // =========================================================
  // REQ-09 / MAILBOX FULL
  // =========================================================
  if (
    text.includes("mailbox full") ||
    text.includes("mailbox is full") ||
    text.includes("mailbox quota") ||
    text.includes("mailbox storage") ||
    (text.includes("mail") && text.includes("full"))
  ) {
    return {
      action: "CREATE_TICKET",
      reason:
        "Mailbox quota management follows the archive and quota policy and may require manager approval.",
      priority: "MEDIUM",
    };
  }

  // =========================================================
  // REQ-12 / EXPENSE SOFTWARE LOGIN
  // =========================================================
  if (
    text.includes("expense") &&
    (
      text.includes("login") ||
      text.includes("log into") ||
      text.includes("log in") ||
      text.includes("access") ||
      text.includes("sign in") ||
      text.includes("signin") ||
      text.includes("invalid credentials") ||
      text.includes("credentials")
    )
  ) {
    return {
      action: "ESCALATE",
      reason:
        "Expense application access is owned by Finance, while IT can assist with login or technical issues once an account exists.",
      priority: "MEDIUM",
    };
  }

  // =========================================================
  // GENERAL LAPTOP REPLACEMENT
  // =========================================================
  if (
    text.includes("laptop replacement") ||
    text.includes("replace my laptop") ||
    text.includes("new laptop")
  ) {
    return {
      action: "CREATE_TICKET",
      reason:
        "Laptop replacement requests must be checked against the hardware replacement policy and fulfillment process.",
      priority: "MEDIUM",
    };
  }

  // =========================================================
  // REQ-15 / VAGUE REQUEST
  // =========================================================
  return {
    action: "ASK_CLARIFICATION",
    reason:
      "The request does not contain enough information to determine the correct action.",
    priority: "LOW",
  };
}

module.exports = {
  decideAction,
};