import hashlib
import httpx
from typing import Tuple


class PasswordCheckerService:
    """Service to check passwords against haveibeenpwned API using k-anonymity."""
    
    HIBP_API_URL = "https://api.pwnedpasswords.com/range/"
    
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash password using SHA-1 and return uppercase hex digest."""
        sha1_hash = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
        return sha1_hash
    
    async def check_password(self, password: str) -> Tuple[bool, int]:
        """
        Check if password has been leaked using k-anonymity model.
        
        Returns:
            Tuple of (is_leaked: bool, breach_count: int)
        """
        password_hash = self.hash_password(password)
        hash_prefix = password_hash[:5]
        hash_suffix = password_hash[5:]
        
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.HIBP_API_URL}{hash_prefix}",
                timeout=10.0
            )
            response.raise_for_status()
        
        # Parse response - each line is "SUFFIX:COUNT"
        for line in response.text.splitlines():
            if not line.strip():
                continue
            
            parts = line.split(':')
            if len(parts) != 2:
                continue
            
            response_suffix, count_str = parts
            if response_suffix == hash_suffix:
                return True, int(count_str)
        
        return False, 0

