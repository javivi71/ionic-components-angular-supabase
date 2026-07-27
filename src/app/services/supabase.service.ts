import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
    

  supabase = createClient(
    'https://btswwfwubsyqgjvgdchy.supabase.co',
    'sb_publishable_MyAAixn37XLuQ6cd3Ks6QA_7jyI-v_D'  );
}
